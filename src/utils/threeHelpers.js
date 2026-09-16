import * as THREE from 'three';

// Create realistic building geometry with floor slicing capabilities
export function createBuildingGroup(buildingData, isNight = false) {
  const group = new THREE.Group();
  group.name = buildingData.id;
  group.userData = {
    buildingId: buildingData.id,
    data: buildingData,
    floorMeshes: []
  };

  const [width, height, depth] = buildingData.dimensions;
  const floors = buildingData.floorsCount || 3;
  const floorHeight = height / floors;

  // Base foundation slab
  const foundationGeo = new THREE.BoxGeometry(width + 1.2, 0.6, depth + 1.2);
  const foundationMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.8,
    metalness: 0.1
  });
  const foundation = new THREE.Mesh(foundationGeo, foundationMat);
  foundation.position.y = 0.3;
  foundation.receiveShadow = true;
  foundation.castShadow = true;
  group.add(foundation);

  // Base colors
  const primaryColor = new THREE.Color(buildingData.color);
  const accentColor = new THREE.Color(buildingData.accentColor);
  const roofColor = new THREE.Color(buildingData.roofColor);

  // Materials
  const wallMat = new THREE.MeshStandardMaterial({
    color: primaryColor,
    roughness: 0.65,
    metalness: 0.15
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    roughness: 0.5,
    metalness: 0.2
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: isNight ? 0xfef08a : 0x7dd3fc,
    emissive: isNight ? 0xeab308 : 0x0284c7,
    emissiveIntensity: isNight ? 0.8 : 0.15,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.6,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85
  });

  // Create individual floor slices for 3D floor explorer
  for (let f = 0; f < floors; f++) {
    const floorGroup = new THREE.Group();
    floorGroup.name = `${buildingData.id}_floor_${f}`;
    floorGroup.userData = {
      floorIndex: f,
      baseY: f * floorHeight + floorHeight / 2 + 0.6
    };

    // Main floor mass
    const floorGeo = new THREE.BoxGeometry(width, floorHeight - 0.2, depth);
    const floorMesh = new THREE.Mesh(floorGeo, wallMat);
    floorMesh.position.y = 0;
    floorMesh.castShadow = true;
    floorMesh.receiveShadow = true;
    floorGroup.add(floorMesh);

    // Floor divider band
    const bandGeo = new THREE.BoxGeometry(width + 0.4, 0.3, depth + 0.4);
    const bandMesh = new THREE.Mesh(bandGeo, accentMat);
    bandMesh.position.y = floorHeight / 2 - 0.15;
    floorGroup.add(bandMesh);

    // Windows along front and back facades
    const windowCols = Math.max(3, Math.floor(width / 3.5));
    const winWidth = (width / windowCols) * 0.6;
    const winHeight = floorHeight * 0.55;

    for (let c = 0; c < windowCols; c++) {
      const xOffset = -width / 2 + (c + 0.5) * (width / windowCols);

      // Front window
      const winGeo = new THREE.PlaneGeometry(winWidth, winHeight);
      const winFront = new THREE.Mesh(winGeo, glassMat);
      winFront.position.set(xOffset, 0, depth / 2 + 0.05);
      floorGroup.add(winFront);

      // Back window
      const winBack = new THREE.Mesh(winGeo, glassMat);
      winBack.position.set(xOffset, 0, -depth / 2 - 0.05);
      winBack.rotation.y = Math.PI;
      floorGroup.add(winBack);
    }

    // Windows along left and right sides
    const sideCols = Math.max(2, Math.floor(depth / 4));
    const sideWinWidth = (depth / sideCols) * 0.6;
    for (let s = 0; s < sideCols; s++) {
      const zOffset = -depth / 2 + (s + 0.5) * (depth / sideCols);

      // Left window
      const winGeo = new THREE.PlaneGeometry(sideWinWidth, winHeight);
      const winLeft = new THREE.Mesh(winGeo, glassMat);
      winLeft.position.set(-width / 2 - 0.05, 0, zOffset);
      winLeft.rotation.y = -Math.PI / 2;
      floorGroup.add(winLeft);

      // Right window
      const winRight = new THREE.Mesh(winGeo, glassMat);
      winRight.position.set(width / 2 + 0.05, 0, zOffset);
      winRight.rotation.y = Math.PI / 2;
      floorGroup.add(winRight);
    }

    // Position floor group in building
    floorGroup.position.y = floorGroup.userData.baseY;
    group.add(floorGroup);
    group.userData.floorMeshes.push(floorGroup);
  }

  // Roof Structure & Parapet
  const roofGroup = new THREE.Group();
  roofGroup.name = `${buildingData.id}_roof`;
  roofGroup.userData = {
    baseY: height + 0.6
  };
  roofGroup.position.y = height + 0.6;

  // Roof slab
  const roofSlabGeo = new THREE.BoxGeometry(width + 0.6, 0.5, depth + 0.6);
  const roofMat = new THREE.MeshStandardMaterial({
    color: roofColor,
    roughness: 0.7,
    metalness: 0.1
  });
  const roofSlab = new THREE.Mesh(roofSlabGeo, roofMat);
  roofSlab.position.y = 0.25;
  roofGroup.add(roofSlab);

  // Rooftop AC units / Solar panels / Equipment
  const acGeo = new THREE.BoxGeometry(2.5, 1.4, 2);
  const acMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4 });
  const ac1 = new THREE.Mesh(acGeo, acMat);
  ac1.position.set(-width / 4, 1.2, 0);
  roofGroup.add(ac1);

  const ac2 = new THREE.Mesh(acGeo, acMat);
  ac2.position.set(width / 4, 1.2, -depth / 4);
  roofGroup.add(ac2);

  // Solar panel arrays on roof
  if (width > 16 && depth > 12) {
    const solarGeo = new THREE.BoxGeometry(6, 0.1, 4);
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.2,
      metalness: 0.8
    });
    const solar = new THREE.Mesh(solarGeo, solarMat);
    solar.position.set(0, 0.7, depth / 4);
    solar.rotation.x = -0.15;
    roofGroup.add(solar);
  }

  // Building Signage Letter / Code Billboard on Top
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 256;
  signCanvas.height = 128;
  const sctx = signCanvas.getContext('2d');
  sctx.fillStyle = '#0f172a';
  sctx.fillRect(0, 0, 256, 128);
  sctx.strokeStyle = '#38bdf8';
  sctx.lineWidth = 6;
  sctx.strokeRect(4, 4, 248, 120);

  sctx.fillStyle = '#ffffff';
  sctx.font = 'bold 44px sans-serif';
  sctx.textAlign = 'center';
  sctx.textBaseline = 'middle';
  sctx.fillText(buildingData.code, 128, 64);

  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMat = new THREE.MeshBasicMaterial({ map: signTex });
  const signGeo = new THREE.BoxGeometry(5, 2.4, 0.4);
  const signMesh = new THREE.Mesh(signGeo, signMat);
  signMesh.position.set(0, 1.8, depth / 2 - 0.5);
  roofGroup.add(signMesh);

  group.add(roofGroup);
  group.userData.roofGroup = roofGroup;

  // Entrance Porch / Canopy at Ground Level
  const porchGeo = new THREE.BoxGeometry(6, 0.4, 3);
  const porchMesh = new THREE.Mesh(porchGeo, accentMat);
  porchMesh.position.set(0, 3.2, depth / 2 + 1.5);
  group.add(porchMesh);

  // Porch pillars
  const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 3);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
  const p1 = new THREE.Mesh(pillarGeo, pillarMat);
  p1.position.set(-2.6, 1.5, depth / 2 + 2.8);
  group.add(p1);

  const p2 = new THREE.Mesh(pillarGeo, pillarMat);
  p2.position.set(2.6, 1.5, depth / 2 + 2.8);
  group.add(p2);

  // Position the entire building on campus
  group.position.set(buildingData.position[0], 0, buildingData.position[2]);

  return group;
}

// Create Main Gate Arch (NH-58)
export function createMainGate() {
  const gateGroup = new THREE.Group();
  gateGroup.position.set(0, 0, -96);

  // Left & Right Monumental Towers
  const towerGeo = new THREE.BoxGeometry(4, 9, 4);
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });

  const leftTower = new THREE.Mesh(towerGeo, towerMat);
  leftTower.position.set(-10, 4.5, 0);
  gateGroup.add(leftTower);

  const rightTower = new THREE.Mesh(towerGeo, towerMat);
  rightTower.position.set(10, 4.5, 0);
  gateGroup.add(rightTower);

  // Overhead Arch Beam
  const archGeo = new THREE.BoxGeometry(24, 3, 3);
  const archMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.4 });
  const archMesh = new THREE.Mesh(archGeo, archMat);
  archMesh.position.set(0, 9.5, 0);
  gateGroup.add(archMesh);

  // Canvas for KIET DEEMED TO BE UNIVERSITY Header
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KIET UNIVERSITY', 256, 52);
  ctx.fillStyle = '#ffffff';
  ctx.font = '500 20px sans-serif';
  ctx.fillText('GATE NO. 1 (NH-58)', 256, 95);

  const gateTex = new THREE.CanvasTexture(canvas);
  const signGeo = new THREE.PlaneGeometry(20, 2.5);
  const signMat = new THREE.MeshBasicMaterial({ map: gateTex });
  const signMesh = new THREE.Mesh(signGeo, signMat);
  signMesh.position.set(0, 9.5, 1.55);
  gateGroup.add(signMesh);

  // Security Guard Cabin
  const cabinGeo = new THREE.BoxGeometry(4, 3, 3);
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(0, 1.5, 0);
  gateGroup.add(cabin);

  return gateGroup;
}

// Create Central Fountain Plaza
export function createFountainPlaza() {
  const fountainGroup = new THREE.Group();
  fountainGroup.position.set(0, 0, -10);

  // Outer Basin
  const basinGeo = new THREE.CylinderGeometry(8, 9, 1, 32);
  const basinMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });
  const basin = new THREE.Mesh(basinGeo, basinMat);
  basin.position.y = 0.5;
  fountainGroup.add(basin);

  // Water Surface
  const waterGeo = new THREE.CylinderGeometry(7.6, 7.6, 0.8, 32);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.85
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.y = 0.6;
  fountainGroup.add(water);

  // Center Tier
  const tierGeo = new THREE.CylinderGeometry(2, 3, 2.5, 16);
  const tierMesh = new THREE.Mesh(tierGeo, basinMat);
  tierMesh.position.y = 1.75;
  fountainGroup.add(tierMesh);

  // Fountain Water Jet Particles
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = 2.5 + Math.random() * 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

    velocities.push({
      x: (Math.random() - 0.5) * 0.06,
      y: 0.08 + Math.random() * 0.08,
      z: (Math.random() - 0.5) * 0.06
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xe0f2fe,
    size: 0.4,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  particleSystem.userData = { velocities };
  fountainGroup.add(particleSystem);
  fountainGroup.userData.particles = particleSystem;

  return fountainGroup;
}

// Create Instanced Trees for Performance (Lush Green Campus)
export function createCampusTrees(count = 140) {
  const treeGroup = new THREE.Group();

  // Trunk geometry
  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.5, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });

  // Foliage geometry (layered cones for stylized look)
  const foliageGeo1 = new THREE.ConeGeometry(2.8, 4, 8);
  const foliageGeo2 = new THREE.ConeGeometry(2.2, 3.2, 8);
  const foliageGeo3 = new THREE.SphereGeometry(2.5, 8, 8);

  const leafMatDark = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
  const leafMatLight = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
  const leafMatAutumn = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 });

  // Fixed pseudorandom seed locations for consistent campus layout
  const treeSpots = [
    // Perimeter along NH-58 and boundary walls
    [-115, -80], [-115, -50], [-115, -20], [-115, 10], [-115, 40], [-115, 70], [-115, 95],
    [115, -80], [115, -50], [115, -20], [115, 10], [115, 40], [115, 70], [115, 95],
    [-90, -95], [-60, -95], [-30, -95], [30, -95], [60, -95], [90, -95],
    [-90, 95], [-60, 95], [-30, 95], [30, 95], [60, 95], [90, 95],
    // Avenues along Central Walkways
    [-8, -70], [8, -70], [-8, -40], [8, -40], [-8, -25], [8, -25],
    [-8, 15], [8, 15], [-8, 35], [8, 35],
    // Around Sports Arena
    [-28, 55], [-28, 75], [-82, 55], [-82, 75], [-55, 92],
    // Around Girls Hostel Quad
    [60, 10], [60, 48], [95, 10], [95, 48],
    // Around Central Library & Temple Garden
    [-35, -75], [-45, -70], [-55, -75], [-65, -80],
    [-5, -25], [-30, -25], [28, -25], [58, -25],
    // Around TBI & Cafeteria
    [-40, -55], [-15, -55], [22, -55], [48, -55]
  ];

  // Fill in remaining with randomized offsets avoiding core building footprints
  for (let i = 0; i < count; i++) {
    let x, z;
    if (i < treeSpots.length) {
      x = treeSpots[i][0] + (Math.random() - 0.5) * 3;
      z = treeSpots[i][1] + (Math.random() - 0.5) * 3;
    } else {
      x = (Math.random() - 0.5) * 230;
      z = (Math.random() - 0.5) * 200;
      // Skip core road spine and main buildings
      if (Math.abs(x) < 12 && z > -90 && z < 70) continue;
      if (Math.abs(x) < 60 && Math.abs(z + 10) < 30) continue;
    }

    const tree = new THREE.Group();
    const scale = 0.75 + Math.random() * 0.5;
    tree.scale.set(scale, scale, scale);
    tree.position.set(x, 0, z);

    // Trunk
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.75;
    trunk.castShadow = true;
    tree.add(trunk);

    // Foliage style choice
    const style = i % 3;
    if (style === 0) {
      const fol = new THREE.Mesh(foliageGeo3, leafMatDark);
      fol.position.y = 4.2;
      fol.castShadow = true;
      tree.add(fol);
    } else if (style === 1) {
      const f1 = new THREE.Mesh(foliageGeo1, leafMatLight);
      f1.position.y = 4;
      f1.castShadow = true;
      tree.add(f1);

      const f2 = new THREE.Mesh(foliageGeo2, leafMatLight);
      f2.position.y = 5.8;
      f2.castShadow = true;
      tree.add(f2);
    } else {
      const fol = new THREE.Mesh(foliageGeo3, leafMatAutumn);
      fol.position.y = 4.5;
      fol.scale.set(1.2, 1.4, 1.2);
      fol.castShadow = true;
      tree.add(fol);
    }

    treeGroup.add(tree);
  }

  return treeGroup;
}

// Create Campus Ground with Roads, Walkways & Sports Grounds
export function createCampusGround() {
  const groundGroup = new THREE.Group();

  // Main Grass Base Plane (260 x 220 units)
  const grassGeo = new THREE.PlaneGeometry(270, 230);
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a1e,
    roughness: 0.9,
    metalness: 0.05
  });
  const grass = new THREE.Mesh(grassGeo, grassMat);
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = 0;
  grass.receiveShadow = true;
  groundGroup.add(grass);

  // Main North-South Central Spine Road (Asphalt)
  const mainRoadGeo = new THREE.PlaneGeometry(10, 180);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.8
  });
  const mainRoad = new THREE.Mesh(mainRoadGeo, roadMat);
  mainRoad.rotation.x = -Math.PI / 2;
  mainRoad.position.set(0, 0.05, -5);
  mainRoad.receiveShadow = true;
  groundGroup.add(mainRoad);

  // Road Dash Markings
  const dashCount = 28;
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  for (let i = 0; i < dashCount; i++) {
    const dashGeo = new THREE.PlaneGeometry(0.4, 3);
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.06, -85 + i * 6);
    groundGroup.add(dash);
  }

  // Cross Promenade Roads (East-West)
  const eastWestRoad1 = new THREE.Mesh(new THREE.PlaneGeometry(210, 8), roadMat);
  eastWestRoad1.rotation.x = -Math.PI / 2;
  eastWestRoad1.position.set(0, 0.04, -48);
  eastWestRoad1.receiveShadow = true;
  groundGroup.add(eastWestRoad1);

  const eastWestRoad2 = new THREE.Mesh(new THREE.PlaneGeometry(210, 8), roadMat);
  eastWestRoad2.rotation.x = -Math.PI / 2;
  eastWestRoad2.position.set(0, 0.04, -10);
  eastWestRoad2.receiveShadow = true;
  groundGroup.add(eastWestRoad2);

  const eastWestRoad3 = new THREE.Mesh(new THREE.PlaneGeometry(210, 8), roadMat);
  eastWestRoad3.rotation.x = -Math.PI / 2;
  eastWestRoad3.position.set(0, 0.04, 30);
  eastWestRoad3.receiveShadow = true;
  groundGroup.add(eastWestRoad3);

  // Cricket Turf Pitch & Outfield (Lush Bright Green Oval)
  const pitchOutfieldGeo = new THREE.CircleGeometry(26, 32);
  const outfieldMat = new THREE.MeshStandardMaterial({
    color: 0x16a34a,
    roughness: 0.8
  });
  const outfield = new THREE.Mesh(pitchOutfieldGeo, outfieldMat);
  outfield.rotation.x = -Math.PI / 2;
  outfield.position.set(-55, 0.06, 68);
  groundGroup.add(outfield);

  // Cricket Center Strip (Clay pitch)
  const pitchGeo = new THREE.PlaneGeometry(4, 12);
  const pitchMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 });
  const pitch = new THREE.Mesh(pitchGeo, pitchMat);
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.set(-55, 0.07, 68);
  groundGroup.add(pitch);

  // Synthetic Basketball & Tennis Court Pad (Blue & Orange)
  const courtGeo = new THREE.PlaneGeometry(30, 24);
  const courtMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
  const court = new THREE.Mesh(courtGeo, courtMat);
  court.rotation.x = -Math.PI / 2;
  court.position.set(25, 0.06, 62);
  groundGroup.add(court);

  // Court White Boundary Lines
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const courtBorder = new THREE.Mesh(new THREE.PlaneGeometry(28, 22), new THREE.MeshBasicMaterial({ color: 0xe0f2fe, wireframe: true }));
  courtBorder.rotation.x = -Math.PI / 2;
  courtBorder.position.set(25, 0.07, 62);
  groundGroup.add(courtBorder);

  // External Highway (NH-58) across the top
  const highwayGeo = new THREE.PlaneGeometry(270, 18);
  const highwayMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
  const highway = new THREE.Mesh(highwayGeo, highwayMat);
  highway.rotation.x = -Math.PI / 2;
  highway.position.set(0, 0.02, -108);
  groundGroup.add(highway);

  return groundGroup;
}

// Create Streetlight Poles along Main Walkways
export function createStreetLights(isNight = false) {
  const lightGroup = new THREE.Group();

  const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 6, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });

  const lampGeo = new THREE.SphereGeometry(0.4, 8, 8);
  const lampMat = new THREE.MeshStandardMaterial({
    color: isNight ? 0xfef08a : 0xe2e8f0,
    emissive: isNight ? 0xfacc15 : 0x000000,
    emissiveIntensity: isNight ? 1.2 : 0
  });

  const lightPositions = [
    [-6, -80], [6, -80],
    [-6, -60], [6, -60],
    [-6, -40], [6, -40],
    [-6, -20], [6, -20],
    [-6, 0], [6, 0],
    [-6, 20], [6, 20],
    [-6, 40], [6, 40],
    [-6, 60], [6, 60],
    [-50, -48], [35, -48],
    [-50, 30], [35, 30]
  ];

  lightPositions.forEach(([x, z]) => {
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(x, 3, z);
    lightGroup.add(pole);

    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(x, 6.2, z);
    lightGroup.add(lamp);

    if (isNight) {
      const spot = new THREE.PointLight(0xfef08a, 1.2, 18, 1.5);
      spot.position.set(x, 6, z);
      lightGroup.add(spot);
    }
  });

  return lightGroup;
}

// Create Animated Glowing Route Path Ribbon
export function createRouteRibbon(points) {
  if (!points || points.length < 2) return null;

  const curvePoints = points.map(p => new THREE.Vector3(p[0], 0.4, p[2]));
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  curve.curveType = 'catmullrom';
  curve.tension = 0.2;

  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.45, 8, false);
  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.9
  });

  const pathMesh = new THREE.Mesh(tubeGeo, tubeMat);

  // Add waypoint indicator rings at each node point
  const pinGroup = new THREE.Group();
  points.forEach((p, idx) => {
    const ringGeo = new THREE.RingGeometry(0.6, 1.2, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: idx === 0 ? 0x22c55e : (idx === points.length - 1 ? 0xef4444 : 0x38bdf8),
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(p[0], 0.45, p[2]);
    pinGroup.add(ring);
  });

  pathMesh.add(pinGroup);
  return pathMesh;
}
