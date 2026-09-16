import { NAV_NODES, NAV_EDGES } from '../data/navGraph';
import { BUILDINGS_DATA } from '../data/campusData';

// Euclidean distance calculation in 3D (X and Z ground plane)
function getDistance(posA, posB) {
  const dx = posA[0] - posB[0];
  const dz = posA[2] - posB[2];
  return Math.sqrt(dx * dx + dz * dz);
}

// 3D Euclidean distance calculation (including elevation / height)
export function getDistance3D(posA, posB) {
  const dx = posA[0] - posB[0];
  const dy = (posA[1] || 0) - (posB[1] || 0);
  const dz = posA[2] - posB[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Build adjacency list graph from nodes and edges
function buildGraph() {
  const adjacency = {};
  for (const nodeId in NAV_NODES) {
    adjacency[nodeId] = [];
  }

  NAV_EDGES.forEach(([u, v]) => {
    if (NAV_NODES[u] && NAV_NODES[v]) {
      const dist = getDistance(NAV_NODES[u].pos, NAV_NODES[v].pos);
      adjacency[u].push({ node: v, weight: dist });
      adjacency[v].push({ node: u, weight: dist });
    }
  });

  return adjacency;
}

// Map buildingId to the closest nav node
export function getNodeForBuilding(buildingId) {
  for (const nodeId in NAV_NODES) {
    if (NAV_NODES[nodeId].buildingId === buildingId) {
      return nodeId;
    }
  }

  // Fallback: Find closest node geographically
  const building = BUILDINGS_DATA.find(b => b.id === buildingId);
  if (!building) return null;

  let closestNode = null;
  let minDist = Infinity;

  for (const nodeId in NAV_NODES) {
    const dist = getDistance(building.position, NAV_NODES[nodeId].pos);
    if (dist < minDist) {
      minDist = dist;
      closestNode = nodeId;
    }
  }
  return closestNode;
}

// Dijkstra's algorithm for finding the optimal pedestrian path
export function findPath(startBuildingId, endBuildingId) {
  if (!startBuildingId || !endBuildingId) return null;
  if (startBuildingId === endBuildingId) return null;

  const startNode = getNodeForBuilding(startBuildingId);
  const endNode = getNodeForBuilding(endBuildingId);

  if (!startNode || !endNode) return null;

  const graph = buildGraph();
  const distances = {};
  const previous = {};
  const unvisited = new Set();

  for (const nodeId in NAV_NODES) {
    distances[nodeId] = Infinity;
    unvisited.add(nodeId);
  }
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    let curr = null;
    let minD = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minD) {
        minD = distances[node];
        curr = node;
      }
    }

    if (!curr || distances[curr] === Infinity) break;
    if (curr === endNode) break;

    unvisited.delete(curr);

    const neighbors = graph[curr] || [];
    for (const edge of neighbors) {
      if (unvisited.has(edge.node)) {
        const alt = distances[curr] + edge.weight;
        if (alt < distances[edge.node]) {
          distances[edge.node] = alt;
          previous[edge.node] = curr;
        }
      }
    }
  }

  // Reconstruct path
  const pathNodes = [];
  let u = endNode;
  while (u) {
    pathNodes.unshift(u);
    u = previous[u];
  }

  if (pathNodes[0] !== startNode) return null;

  // Convert to 3D coordinate points
  const points = pathNodes.map(nodeId => NAV_NODES[nodeId].pos);

  // Calculate real metric distance (1 unit ~ 2.5 meters)
  const totalUnits = distances[endNode];
  const meters = Math.round(totalUnits * 2.5);
  const minutes = Math.max(1, Math.round(meters / 75)); // Average walking speed ~75m/min

  // Generate step-by-step turn directions
  const steps = generateTurnDirections(pathNodes);

  return {
    nodeIds: pathNodes,
    points,
    distanceMeters: meters,
    durationMinutes: minutes,
    steps
  };
}

function generateTurnDirections(pathNodes) {
  if (pathNodes.length <= 1) return [];

  const directions = [];
  const startName = NAV_NODES[pathNodes[0]].name;
  directions.push({
    instruction: `Start at ${startName}`,
    distance: 0
  });

  for (let i = 1; i < pathNodes.length; i++) {
    const prev = NAV_NODES[pathNodes[i - 1]];
    const curr = NAV_NODES[pathNodes[i]];
    const dist = Math.round(getDistance(prev.pos, curr.pos) * 2.5);

    if (i === pathNodes.length - 1) {
      directions.push({
        instruction: `Arrive at destination: ${curr.name}`,
        distance: dist
      });
    } else {
      directions.push({
        instruction: `Walk along path to ${curr.name}`,
        distance: dist
      });
    }
  }

  return directions;
}

// Calculate comprehensive Inter-Block Distance comparison
export function calculateInterBlockDistance(buildingIdA, buildingIdB) {
  if (!buildingIdA || !buildingIdB) return null;
  const bA = BUILDINGS_DATA.find(b => b.id === buildingIdA);
  const bB = BUILDINGS_DATA.find(b => b.id === buildingIdB);
  if (!bA || !bB) return null;

  if (buildingIdA === buildingIdB) {
    return {
      buildingA: bA,
      buildingB: bB,
      aerialMeters: 0,
      aerialFeet: 0,
      walkMeters: 0,
      walkFeet: 0,
      walkMinutes: 0,
      stepsCount: 0,
      droneFlightSeconds: 0,
      posA: bA.position,
      posB: bB.position,
      walkRoute: null
    };
  }

  // 1. Aerial / Straight line 3D distance
  const posA3D = [bA.position[0], bA.dimensions[1] / 2, bA.position[2]];
  const posB3D = [bB.position[0], bB.dimensions[1] / 2, bB.position[2]];
  const rawAerialUnits = getDistance3D(posA3D, posB3D);
  const aerialMeters = Math.round(rawAerialUnits * 2.5);
  const aerialFeet = Math.round(aerialMeters * 3.28084);

  // 2. Walkway Path Distance
  const walkRoute = findPath(buildingIdA, buildingIdB);
  const walkMeters = walkRoute ? walkRoute.distanceMeters : Math.round(aerialMeters * 1.25);
  const walkFeet = Math.round(walkMeters * 3.28084);
  const walkMinutes = walkRoute ? walkRoute.durationMinutes : Math.max(1, Math.round(walkMeters / 75));
  const stepsCount = Math.round(walkMeters * 1.3); // ~1.3 steps per meter
  const droneFlightSeconds = Math.max(1, Math.round(aerialMeters / 15)); // Drone flight ~15 m/s

  return {
    buildingA: bA,
    buildingB: bB,
    aerialMeters,
    aerialFeet,
    walkMeters,
    walkFeet,
    walkMinutes,
    stepsCount,
    droneFlightSeconds,
    posA: posA3D,
    posB: posB3D,
    walkRoute
  };
}

// Calculate Proximity Matrix from an origin block to all other campus blocks
export function getDistanceMatrixFrom(originBuildingId) {
  if (!originBuildingId) return [];
  const origin = BUILDINGS_DATA.find(b => b.id === originBuildingId);
  if (!origin) return [];

  return BUILDINGS_DATA
    .filter(b => b.id !== originBuildingId)
    .map(dest => {
      const calc = calculateInterBlockDistance(originBuildingId, dest.id);
      return {
        building: dest,
        aerialMeters: calc.aerialMeters,
        aerialFeet: calc.aerialFeet,
        walkMeters: calc.walkMeters,
        walkMinutes: calc.walkMinutes,
        stepsCount: calc.stepsCount
      };
    })
    .sort((a, b) => a.walkMeters - b.walkMeters); // Sort from nearest to furthest
}
