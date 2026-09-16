import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { BUILDINGS_DATA, CAMPUS_STATS, getBuildingAreaMetrics, CAMPUS_ZONES } from '../data/campusData';
import {
  createBuildingGroup,
  createMainGate,
  createFountainPlaza,
  createCampusTrees,
  createCampusGround,
  createStreetLights,
  createRouteRibbon
} from '../utils/threeHelpers';

export default function Canvas3D({
  activeBuilding,
  setActiveBuilding,
  isExploded,
  timeOfDay, // 'day' | 'sunset' | 'night' | 'rain'
  cameraPreset,
  tourCurrentStep,
  isTouring,
  activeRoute,
  measureMode,
  measurePoints,
  setMeasurePoints,
  isFPMode,
  fpMoveVector,
  onScreenLabels = true,
  directDistancePair = null, // { buildingA, buildingB, aerialMeters, walkMeters }
  isAreaHeatmapActive = false,
  highlightedAreaBuilding = null,
  highlightedZone = null
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const buildingGroupsRef = useRef(new Map());
  const animationFrameRef = useRef(null);
  const routeMeshRef = useRef(null);
  const directLaserMeshRef = useRef(null);
  const heatmapMeshGroupRef = useRef(null);
  const fountainParticlesRef = useRef(null);
  const rainParticlesRef = useRef(null);
  const measureLineRef = useRef(null);

  // Camera Target & Animation
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const cameraDesiredPosRef = useRef(new THREE.Vector3(0, 130, 120));
  const cameraDesiredTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioningRef = useRef(false);

  // Orbit & Mouse Interaction state
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const hoveredBuildingRef = useRef(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [buildingScreenPositions, setBuildingScreenPositions] = useState([]);
  const [midpointScreenPos, setMidpointScreenPos] = useState(null);

  // First-Person Mode state
  const fpPosRef = useRef(new THREE.Vector3(0, 2.5, -80));
  const fpYawRef = useRef(0);
  const fpPitchRef = useRef(0);

  // Initialize Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 130, 120);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // 4. Populate Campus Elements
    const isNight = timeOfDay === 'night';

    // Ground
    const ground = createCampusGround();
    scene.add(ground);

    // Main Gate
    const mainGate = createMainGate();
    scene.add(mainGate);

    // Fountain Plaza
    const fountain = createFountainPlaza();
    scene.add(fountain);
    fountainParticlesRef.current = fountain.userData.particles;

    // Trees
    const trees = createCampusTrees(130);
    scene.add(trees);

    // Street Lights
    const streetLights = createStreetLights(isNight);
    streetLights.name = 'streetlights';
    scene.add(streetLights);

    // Buildings
    buildingGroupsRef.current.clear();
    BUILDINGS_DATA.forEach(data => {
      const bGroup = createBuildingGroup(data, isNight);
      scene.add(bGroup);
      buildingGroupsRef.current.set(data.id, bGroup);
    });

    // Rain Particle System
    const rainCount = 1500;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 280;
      rainPositions[i * 3 + 1] = Math.random() * 80;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 240;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.35,
      transparent: true,
      opacity: 0.6
    });
    const rainMesh = new THREE.Points(rainGeo, rainMat);
    rainMesh.visible = timeOfDay === 'rain';
    scene.add(rainMesh);
    rainParticlesRef.current = rainMesh;

    // Window Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Main Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Animate Fountain Particles
      if (fountainParticlesRef.current) {
        const positions = fountainParticlesRef.current.geometry.attributes.position.array;
        const velocities = fountainParticlesRef.current.userData.velocities;
        for (let i = 0; i < velocities.length; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          // Reset particle if it falls back down
          if (positions[i * 3 + 1] > 8 || positions[i * 3 + 1] < 1.5) {
            positions[i * 3] = (Math.random() - 0.5) * 1.5;
            positions[i * 3 + 1] = 2.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
          }
        }
        fountainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Rain
      if (rainParticlesRef.current && rainParticlesRef.current.visible) {
        const pos = rainParticlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < rainCount; i++) {
          pos[i * 3 + 1] -= 2.2;
          if (pos[i * 3 + 1] < 0) {
            pos[i * 3 + 1] = 80;
          }
        }
        rainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Camera Interpolation (Smooth Easing)
      if (!isFPMode) {
        camera.position.lerp(cameraDesiredPosRef.current, 0.05);
        cameraTargetRef.current.lerp(cameraDesiredTargetRef.current, 0.05);
        camera.lookAt(cameraTargetRef.current);
      } else {
        // First-person navigation
        camera.position.copy(fpPosRef.current);
        const lookDir = new THREE.Vector3(
          Math.sin(fpYawRef.current) * Math.cos(fpPitchRef.current),
          Math.sin(fpPitchRef.current),
          -Math.cos(fpYawRef.current) * Math.cos(fpPitchRef.current)
        );
        camera.lookAt(camera.position.clone().add(lookDir));
      }

      // Update On-Screen 2D HUD label coordinates
      if (onScreenLabels && !isFPMode) {
        const screenCoords = [];
        const w = mountRef.current?.clientWidth || window.innerWidth;
        const h = mountRef.current?.clientHeight || window.innerHeight;

        BUILDINGS_DATA.forEach(b => {
          const pos3D = new THREE.Vector3(b.position[0], b.dimensions[1] + 2.5, b.position[2]);
          pos3D.project(camera);

          // Only if in front of camera
          if (pos3D.z < 1) {
            const x = (pos3D.x * 0.5 + 0.5) * w;
            const y = (-(pos3D.y * 0.5) + 0.5) * h;
            const metrics = getBuildingAreaMetrics(b);
            screenCoords.push({
              id: b.id,
              code: b.code,
              name: b.shortName,
              tag: b.tag,
              color: b.color,
              x,
              y,
              footprintM2: metrics.footprintM2,
              percentOfCampus: metrics.percentOfCampus,
              grossFloorM2: metrics.grossFloorM2
            });
          }
        });
        setBuildingScreenPositions(screenCoords);
      }

      // Update walkway distance midpoint screen coordinates along the path
      if (directDistancePair && directDistancePair.walkRoute && directDistancePair.walkRoute.points?.length > 0 && !isFPMode) {
        const points = directDistancePair.walkRoute.points;
        const midIdx = Math.floor(points.length / 2);
        const midPoint = points[midIdx];

        const mid3D = new THREE.Vector3(midPoint[0], 3.5, midPoint[2]);
        mid3D.project(camera);

        if (mid3D.z < 1) {
          const w = mountRef.current?.clientWidth || window.innerWidth;
          const h = mountRef.current?.clientHeight || window.innerHeight;
          setMidpointScreenPos({
            x: (mid3D.x * 0.5 + 0.5) * w,
            y: (-(mid3D.y * 0.5) + 0.5) * h,
            walkMeters: directDistancePair.walkMeters,
            walkMinutes: directDistancePair.walkMinutes,
            stepsCount: directDistancePair.stepsCount,
            buildingA: directDistancePair.buildingA,
            buildingB: directDistancePair.buildingB
          });
        } else {
          setMidpointScreenPos(null);
        }
      } else {
        setMidpointScreenPos(null);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Lighting & Weather
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove existing lights
    const existingLights = scene.children.filter(c => c.isLight);
    existingLights.forEach(l => scene.remove(l));

    if (rainParticlesRef.current) {
      rainParticlesRef.current.visible = timeOfDay === 'rain';
    }

    if (timeOfDay === 'day') {
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.FogExp2(0x0f172a, 0.0025);

      const hemi = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 0.85);
      scene.add(hemi);

      const sun = new THREE.DirectionalLight(0xfffbeb, 1.4);
      sun.position.set(60, 110, 50);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      sun.shadow.camera.near = 10;
      sun.shadow.camera.far = 300;
      sun.shadow.camera.left = -140;
      sun.shadow.camera.right = 140;
      sun.shadow.camera.top = 140;
      sun.shadow.camera.bottom = -140;
      scene.add(sun);
    } else if (timeOfDay === 'sunset') {
      scene.background = new THREE.Color(0x311025);
      scene.fog = new THREE.FogExp2(0x311025, 0.0035);

      const hemi = new THREE.HemisphereLight(0xfdba74, 0x4c1d95, 0.9);
      scene.add(hemi);

      const sun = new THREE.DirectionalLight(0xf97316, 1.8);
      sun.position.set(-110, 40, -40);
      sun.castShadow = true;
      scene.add(sun);
    } else if (timeOfDay === 'night') {
      scene.background = new THREE.Color(0x020617);
      scene.fog = new THREE.FogExp2(0x020617, 0.004);

      const hemi = new THREE.HemisphereLight(0x1e293b, 0x020617, 0.3);
      scene.add(hemi);

      const moon = new THREE.DirectionalLight(0x38bdf8, 0.5);
      moon.position.set(-40, 80, -40);
      scene.add(moon);
    } else if (timeOfDay === 'rain') {
      scene.background = new THREE.Color(0x1e293b);
      scene.fog = new THREE.FogExp2(0x1e293b, 0.006);

      const hemi = new THREE.HemisphereLight(0x64748b, 0x334155, 0.6);
      scene.add(hemi);

      const greyLight = new THREE.DirectionalLight(0x94a3b8, 0.6);
      greyLight.position.set(20, 80, 20);
      scene.add(greyLight);
    }
  }, [timeOfDay]);

  // Handle Active Building Floor Explosion Slicing
  useEffect(() => {
    buildingGroupsRef.current.forEach((group, id) => {
      const isThisBuilding = activeBuilding?.id === id;
      const floorMeshes = group.userData.floorMeshes || [];
      const roofGroup = group.userData.roofGroup;

      floorMeshes.forEach((floorGroup, idx) => {
        const baseY = floorGroup.userData.baseY;
        const targetY = (isThisBuilding && isExploded) ? baseY + idx * 5.5 : baseY;
        // Smooth floor animation
        floorGroup.position.y = targetY;
      });

      if (roofGroup) {
        const baseRoofY = roofGroup.userData.baseY;
        roofGroup.position.y = (isThisBuilding && isExploded) ? baseRoofY + (floorMeshes.length * 5.5) : baseRoofY;
      }
    });
  }, [activeBuilding, isExploded]);

  // Handle Building Focus Camera Animation
  useEffect(() => {
    if (!activeBuilding || isTouring || isFPMode) return;

    const [bx, by, bz] = activeBuilding.position;
    const [w, h, d] = activeBuilding.dimensions;

    cameraDesiredTargetRef.current.set(bx, h / 2, bz);
    cameraDesiredPosRef.current.set(bx + w * 0.8, h + 18, bz + d * 1.5);
  }, [activeBuilding, isTouring, isFPMode]);

  // Handle Camera Presets
  useEffect(() => {
    if (!cameraPreset || isTouring || isFPMode) return;
    cameraDesiredPosRef.current.set(...cameraPreset.position);
    cameraDesiredTargetRef.current.set(...cameraPreset.target);
  }, [cameraPreset, isTouring, isFPMode]);

  // Handle Guided Drone Tour Steps
  useEffect(() => {
    if (!isTouring || !tourCurrentStep) return;
    cameraDesiredPosRef.current.set(...tourCurrentStep.cameraPos);
    cameraDesiredTargetRef.current.set(...tourCurrentStep.targetPos);
  }, [isTouring, tourCurrentStep]);

  // Handle Navigation Route Line
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove old route ribbon
    if (routeMeshRef.current) {
      scene.remove(routeMeshRef.current);
      routeMeshRef.current = null;
    }

    if (activeRoute && activeRoute.points && activeRoute.points.length > 1) {
      const ribbon = createRouteRibbon(activeRoute.points);
      if (ribbon) {
        scene.add(ribbon);
        routeMeshRef.current = ribbon;
      }
    }
  }, [activeRoute]);

  // Handle Measure Tool Lines
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (measureLineRef.current) {
      scene.remove(measureLineRef.current);
      measureLineRef.current = null;
    }

    if (measurePoints && measurePoints.length === 2) {
      const p1 = new THREE.Vector3(...measurePoints[0]);
      const p2 = new THREE.Vector3(...measurePoints[1]);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0xf59e0b,
        dashSize: 1,
        gapSize: 0.5,
        linewidth: 3
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);
      measureLineRef.current = line;
    }
  }, [measurePoints]);

  // Handle Walkway Pathway Ribbon for Inter-Block Distance
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (directLaserMeshRef.current) {
      scene.remove(directLaserMeshRef.current);
      directLaserMeshRef.current = null;
    }

    if (directDistancePair && directDistancePair.walkRoute && directDistancePair.walkRoute.points?.length > 1) {
      const points = directDistancePair.walkRoute.points;
      const bA = directDistancePair.buildingA;
      const bB = directDistancePair.buildingB;

      const pathGroup = new THREE.Group();

      // Glowing Ground Path Ribbon along walkways
      const curvePoints = points.map(p => new THREE.Vector3(p[0], 0.45, p[2]));
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      curve.curveType = 'catmullrom';
      curve.tension = 0.2;

      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.55, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      pathGroup.add(tubeMesh);

      // Waypoint rings at each corner / turn of the campus walkway
      points.forEach((p, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === points.length - 1;

        const ringGeo = new THREE.RingGeometry(0.8, isStart || isEnd ? 1.8 : 1.2, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: isStart ? 0x22c55e : (isEnd ? 0xf43f5e : 0x38bdf8),
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(p[0], 0.5, p[2]);
        pathGroup.add(ring);
      });

      scene.add(pathGroup);
      directLaserMeshRef.current = pathGroup;

      // Adjust camera to view the full walkway path
      if (!isTouring && !isFPMode) {
        let minX = Infinity, maxX = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        points.forEach(p => {
          if (p[0] < minX) minX = p[0];
          if (p[0] > maxX) maxX = p[0];
          if (p[2] < minZ) minZ = p[2];
          if (p[2] > maxZ) maxZ = p[2];
        });

        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;
        const spanX = Math.abs(maxX - minX);
        const spanZ = Math.abs(maxZ - minZ);
        const maxSpan = Math.max(spanX, spanZ, 40);

        cameraDesiredTargetRef.current.set(centerX, 0, centerZ);
        cameraDesiredPosRef.current.set(
          centerX,
          Math.max(45, maxSpan * 0.9 + 25),
          centerZ + Math.max(40, maxSpan * 0.8 + 20)
        );
      }
    }
  }, [directDistancePair, isTouring, isFPMode]);

  // Handle 3D Area Mapping & Land-Use Heatmap Layer
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (heatmapMeshGroupRef.current) {
      scene.remove(heatmapMeshGroupRef.current);
      heatmapMeshGroupRef.current = null;
    }

    if (isAreaHeatmapActive) {
      const heatmapGroup = new THREE.Group();
      heatmapGroup.name = 'area_heatmap_layer';

      // 1. Render color-coded glowing ground pads under every building
      BUILDINGS_DATA.forEach(b => {
        const [w, h, d] = b.dimensions;
        const padGeo = new THREE.PlaneGeometry(w + 2.5, d + 2.5);
        const padMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(b.color),
          transparent: true,
          opacity: 0.45,
          side: THREE.DoubleSide
        });
        const pad = new THREE.Mesh(padGeo, padMat);
        pad.rotation.x = -Math.PI / 2;
        pad.position.set(b.position[0], 0.1, b.position[2]);
        heatmapGroup.add(pad);

        // Border outline
        const borderGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w + 2.5, 0.2, d + 2.5));
        const borderMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        const border = new THREE.LineSegments(borderGeo, borderMat);
        border.position.set(b.position[0], 0.15, b.position[2]);
        heatmapGroup.add(border);
      });

      // 2. Render Zone Bounding Overlays
      const zoneBounds = [
        { id: 'zone-academic', color: 0x3b82f6, bounds: [-55, 55, -58, 20] },
        { id: 'zone-hostel', color: 0xec4899, bounds: [-95, -60, -65, 55] },
        { id: 'zone-sports', color: 0x22c55e, bounds: [-80, 45, 45, 85] }
      ];

      zoneBounds.forEach(z => {
        const [minX, maxX, minZ, maxZ] = z.bounds;
        const width = maxX - minX;
        const depth = maxZ - minZ;
        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;

        const zoneGeo = new THREE.PlaneGeometry(width, depth);
        const zoneMat = new THREE.MeshBasicMaterial({
          color: z.color,
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide
        });
        const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
        zoneMesh.rotation.x = -Math.PI / 2;
        zoneMesh.position.set(centerX, 0.08, centerZ);
        heatmapGroup.add(zoneMesh);
      });

      scene.add(heatmapGroup);
      heatmapMeshGroupRef.current = heatmapGroup;
    }
  }, [isAreaHeatmapActive]);

  // Handle Camera Frame on Highlighted Area Building
  useEffect(() => {
    if (!highlightedAreaBuilding || isTouring || isFPMode) return;
    const [bx, by, bz] = highlightedAreaBuilding.position;
    const [w, h, d] = highlightedAreaBuilding.dimensions;

    cameraDesiredTargetRef.current.set(bx, h / 2, bz);
    cameraDesiredPosRef.current.set(bx + w * 0.8, h + 22, bz + d * 1.6);
  }, [highlightedAreaBuilding, isTouring, isFPMode]);

  // Handle First-Person Movement
  useEffect(() => {
    if (!isFPMode || !fpMoveVector) return;
    const speed = 0.8;
    const forward = new THREE.Vector3(Math.sin(fpYawRef.current), 0, -Math.cos(fpYawRef.current)).normalize();
    const right = new THREE.Vector3(Math.cos(fpYawRef.current), 0, Math.sin(fpYawRef.current)).normalize();

    fpPosRef.current.add(forward.clone().multiplyScalar(fpMoveVector.y * speed));
    fpPosRef.current.add(right.clone().multiplyScalar(fpMoveVector.x * speed));

    // Clamp inside campus boundaries
    fpPosRef.current.x = Math.max(-110, Math.min(110, fpPosRef.current.x));
    fpPosRef.current.z = Math.max(-95, Math.min(95, fpPosRef.current.z));
    fpPosRef.current.y = 2.5; // Eye height
  }, [isFPMode, fpMoveVector]);

  // Mouse & Touch Controls (Orbit, Zoom, Pan, Raycasting)
  const handleMouseDown = (e) => {
    if (e.button !== 0 && e.button !== 2) return;
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!rendererRef.current || !cameraRef.current || !sceneRef.current) return;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!isFPMode) {
        // Orbit Controls around desired target
        const offset = cameraDesiredPosRef.current.clone().sub(cameraDesiredTargetRef.current);
        const radius = offset.length();
        let theta = Math.atan2(offset.x, offset.z);
        let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));

        theta -= deltaX * 0.006;
        phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, phi + deltaY * 0.006));

        cameraDesiredPosRef.current.x = cameraDesiredTargetRef.current.x + radius * Math.sin(phi) * Math.sin(theta);
        cameraDesiredPosRef.current.y = cameraDesiredTargetRef.current.y + radius * Math.cos(phi);
        cameraDesiredPosRef.current.z = cameraDesiredTargetRef.current.z + radius * Math.sin(phi) * Math.cos(theta);
      } else {
        // FP Mode Look
        fpYawRef.current -= deltaX * 0.004;
        fpPitchRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, fpPitchRef.current - deltaY * 0.004));
      }
    } else if (!isFPMode) {
      // Raycasting for Hover Highlights
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const buildingMeshes = [];
      buildingGroupsRef.current.forEach(group => {
        group.traverse(child => {
          if (child.isMesh) buildingMeshes.push(child);
        });
      });

      const intersects = raycaster.intersectObjects(buildingMeshes, false);
      if (intersects.length > 0) {
        let parent = intersects[0].object;
        while (parent && !parent.userData?.buildingId && parent.parent) {
          parent = parent.parent;
        }
        if (parent && parent.userData?.buildingId) {
          const bData = BUILDINGS_DATA.find(b => b.id === parent.userData.buildingId);
          setHoveredBuilding(bData);
          rendererRef.current.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredBuilding(null);
      rendererRef.current.domElement.style.cursor = 'default';
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    if (isFPMode) return;
    e.preventDefault();
    const zoomFactor = e.deltaY * 0.08;
    const offset = cameraDesiredPosRef.current.clone().sub(cameraDesiredTargetRef.current);
    const newDist = Math.max(15, Math.min(220, offset.length() + zoomFactor));
    offset.setLength(newDist);
    cameraDesiredPosRef.current.copy(cameraDesiredTargetRef.current.clone().add(offset));
  };

  const handleClick = (e) => {
    if (!rendererRef.current || !cameraRef.current || isDraggingRef.current) return;

    const rect = rendererRef.current.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    // If in measure mode
    if (measureMode) {
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, point);
      if (point) {
        if (measurePoints.length >= 2) {
          setMeasurePoints([[point.x, 0.4, point.z]]);
        } else {
          setMeasurePoints([...measurePoints, [point.x, 0.4, point.z]]);
        }
      }
      return;
    }

    // Select Building
    const buildingMeshes = [];
    buildingGroupsRef.current.forEach(group => {
      group.traverse(child => {
        if (child.isMesh) buildingMeshes.push(child);
      });
    });

    const intersects = raycaster.intersectObjects(buildingMeshes, false);
    if (intersects.length > 0) {
      let parent = intersects[0].object;
      while (parent && !parent.userData?.buildingId && parent.parent) {
        parent = parent.parent;
      }
      if (parent && parent.userData?.buildingId) {
        const bData = BUILDINGS_DATA.find(b => b.id === parent.userData.buildingId);
        if (bData) {
          setActiveBuilding(bData);
        }
      }
    }
  };

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleClick}
    >
      {/* 3D Floating Building Name Badges on Campus */}
      {onScreenLabels && !isFPMode && !isTouring && buildingScreenPositions.map(pos => {
        const isSelected = activeBuilding?.id === pos.id;
        const isHovered = hoveredBuilding?.id === pos.id;

        return (
          <div
            key={pos.id}
            style={{
              transform: `translate(-50%, -100%) translate3d(${pos.x}px, ${pos.y}px, 0)`,
              opacity: isSelected ? 1 : isHovered ? 1 : 0.85
            }}
            onClick={(e) => {
              e.stopPropagation();
              const bData = BUILDINGS_DATA.find(b => b.id === pos.id);
              if (bData) setActiveBuilding(bData);
            }}
            className={`absolute pointer-events-auto cursor-pointer transition-all duration-150 ${
              isSelected ? 'scale-110 z-30' : isHovered ? 'scale-105 z-20' : 'scale-90 hover:scale-100 z-10'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md transition-all ${
                isSelected
                  ? 'bg-sky-500 text-white border-2 border-white ring-4 ring-sky-500/30'
                  : 'bg-slate-900/80 text-slate-200 border border-slate-700/80 hover:border-sky-400 hover:text-white'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: pos.color }}
              >
                {pos.code}
              </span>
              <span className="whitespace-nowrap">{pos.name}</span>
              {isAreaHeatmapActive && pos.footprintM2 && (
                <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded ml-1 border border-emerald-500/30">
                  {pos.footprintM2.toLocaleString()} m²
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Hover Info Tooltip */}
      {hoveredBuilding && !activeBuilding && !isFPMode && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-xl text-center pointer-events-none z-30 border border-sky-500/30 animate-float">
          <div className="text-xs text-sky-400 font-bold uppercase tracking-wider">{hoveredBuilding.tag}</div>
          <div className="text-sm font-semibold text-white">{hoveredBuilding.name}</div>
          <div className="text-[11px] text-slate-400">Click to explore departments & 3D floors</div>
        </div>
      )}

      {/* Floating 3D Midpoint Distance Badge for Inter-Block Measurement */}
      {midpointScreenPos && !isFPMode && (
        <div
          style={{
            transform: `translate(-50%, -50%) translate3d(${midpointScreenPos.x}px, ${midpointScreenPos.y}px, 0)`
          }}
          className="absolute pointer-events-none z-30 animate-bounce-slow"
        >
          <div className="glass-panel px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-sky-400 bg-slate-950/95 text-center ring-4 ring-sky-500/25">
            <div className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center justify-center gap-1">
              <span>Campus Pathway Distance</span>
            </div>
            <div className="text-xl font-black text-white leading-tight mt-0.5">
              {midpointScreenPos.walkMeters} <span className="text-sm text-sky-300 font-bold">meters</span>
            </div>
            <div className="text-[11px] text-amber-300 font-bold mt-0.5">
              ~{midpointScreenPos.walkMinutes} min walk <span className="text-slate-400 font-normal">• ~{midpointScreenPos.stepsCount} steps</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
