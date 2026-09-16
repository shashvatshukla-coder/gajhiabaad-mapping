import { NAV_NODES, NAV_EDGES } from '../data/navGraph';
import { BUILDINGS_DATA } from '../data/campusData';

// Euclidean distance calculation in 3D (X and Z ground plane)
function getDistance(posA, posB) {
  const dx = posA[0] - posB[0];
  const dz = posA[2] - posB[2];
  return Math.sqrt(dx * dx + dz * dz);
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
