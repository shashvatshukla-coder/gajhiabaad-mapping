// Navigational Walkway Graph for KIET Campus Wayfinding
// Nodes are key intersection points and building entrances on campus walkways.

export const NAV_NODES = {
  // Gate Entrances
  'node-gate1': { id: 'node-gate1', name: 'Main Gate 1 (NH-58)', pos: [0, 0, -92], buildingId: 'gate-1-main' },
  'node-gate2': { id: 'node-gate2', name: 'Gate 2 (Hostel Entry)', pos: [-92, 0, -20], buildingId: 'gate-2-hostel' },
  'node-gate3': { id: 'node-gate3', name: 'Gate 3 (Sports Gate)', pos: [0, 0, 88], buildingId: 'gate-3-sports' },

  // Main Spine & Intersections
  'node-junction-gate1': { id: 'node-junction-gate1', name: 'Gate 1 Plaza', pos: [0, 0, -78] },
  'node-temple-plaza': { id: 'node-temple-plaza', name: 'Temple & ATM Walkway', pos: [-40, 0, -78], buildingId: 'campus-temple' },
  'node-atm-plaza': { id: 'node-atm-plaza', name: 'ATM & Banking Plaza', pos: [-22, 0, -78], buildingId: 'atm-plaza' },
  'node-junction-central-north': { id: 'node-junction-central-north', name: 'North Central Crossroad', pos: [0, 0, -48] },
  'node-junction-central-mid': { id: 'node-junction-central-mid', name: 'Central Fountain Plaza', pos: [0, 0, -10] },
  'node-junction-central-south': { id: 'node-junction-central-south', name: 'South Promenade', pos: [0, 0, 30] },
  'node-junction-sports-north': { id: 'node-junction-sports-north', name: 'Sports Complex Entry', pos: [0, 0, 65] },

  // West Walkway (Academic & Hostels Spine)
  'node-west-north': { id: 'node-west-north', name: 'TBI & Cafe Junction', pos: [-50, 0, -48], buildingId: 'tbi-incubator' },
  'node-west-mid': { id: 'node-west-mid', name: 'Block A & E Intersection', pos: [-50, 0, -10] },
  'node-west-south': { id: 'node-west-south', name: 'Hostel Quad Crossroad', pos: [-65, 0, 25] },
  'node-west-sports': { id: 'node-west-sports', name: 'Cricket Arena Walkway', pos: [-55, 0, 50], buildingId: 'cricket-ground' },

  // East Walkway (Engineering & Girls Hostels Spine)
  'node-east-north': { id: 'node-east-north', name: 'KSOP Pharmacy Plaza', pos: [35, 0, -45], buildingId: 'ksop-block' },
  'node-east-mid': { id: 'node-east-mid', name: 'Block D & H Intersection', pos: [35, 0, -10] },
  'node-east-south': { id: 'node-east-south', name: 'Girls Hostel & Courts Junction', pos: [55, 0, 25] },
  'node-east-courts': { id: 'node-east-courts', name: 'Basketball & Tennis Courts', pos: [25, 0, 50], buildingId: 'sports-complex-courts' },

  // Building Entrance Nodes
  'node-block-a': { id: 'node-block-a', name: 'Block A Entrance', pos: [-45, 0, -15], buildingId: 'block-a' },
  'node-block-b': { id: 'node-block-b', name: 'Block B Library Entrance', pos: [-18, 0, -20], buildingId: 'block-b' },
  'node-block-c': { id: 'node-block-c', name: 'Block C ECE Entrance', pos: [12, 0, -20], buildingId: 'block-c' },
  'node-block-d': { id: 'node-block-d', name: 'Block D Mech Entrance', pos: [42, 0, -15], buildingId: 'block-d' },
  'node-block-e': { id: 'node-block-e', name: 'Block E CSE Entrance', pos: [-38, 0, -5], buildingId: 'block-e' },
  'node-block-f': { id: 'node-block-f', name: 'Block F IT/MCA Entrance', pos: [-10, 0, -2], buildingId: 'block-f' },
  'node-block-g': { id: 'node-block-g', name: 'Block G MBA Entrance', pos: [20, 0, 0], buildingId: 'block-g' },
  'node-block-h': { id: 'node-block-h', name: 'Block H CoE Entrance', pos: [48, 0, -2], buildingId: 'block-h' },
  'node-ksop': { id: 'node-ksop', name: 'KSOP Pharmacy Entrance', pos: [35, 0, -42], buildingId: 'ksop-block' },
  'node-tbi': { id: 'node-tbi', name: 'TBI Innovation Hub Entrance', pos: [-50, 0, -40], buildingId: 'tbi-incubator' },

  'node-audi': { id: 'node-audi', name: 'Central Auditorium Entrance', pos: [0, 0, -50], buildingId: 'central-auditorium' },
  'node-oat': { id: 'node-oat', name: 'OAT Amphitheatre Entry', pos: [-10, 0, 36], buildingId: 'open-air-theatre' },
  'node-cafe': { id: 'node-cafe', name: 'Central Cafeteria Plaza', pos: [-25, 0, -52], buildingId: 'central-cafeteria' },
  'node-snack': { id: 'node-snack', name: 'CCD & Snack Corner', pos: [12, 0, -52], buildingId: 'ccd-amul-nescafe' },
  'node-dispensary': { id: 'node-dispensary', name: 'Dispensary & Health Care', pos: [55, 0, -25], buildingId: 'dispensary-medical' },

  // Hostels
  'node-aryabhatta': { id: 'node-aryabhatta', name: 'Aryabhatta Boys Hostel (BH-1)', pos: [-72, 0, 15], buildingId: 'hostel-aryabhatta' },
  'node-cvraman': { id: 'node-cvraman', name: 'CV Raman Hostel (BH-2)', pos: [-72, 0, 45], buildingId: 'hostel-cv-raman' },
  'node-tagore': { id: 'node-tagore', name: 'Tagore & Vivekanand Hostel', pos: [-72, 0, -25], buildingId: 'hostel-tagore-vivekanand' },
  'node-chandragupt': { id: 'node-chandragupt', name: 'Chandragupt & Chanakya Hostel', pos: [-72, 0, -55], buildingId: 'hostel-chandragupt-chanakya' },
  'node-girls-hostel': { id: 'node-girls-hostel', name: 'Girls Hostels Complex (Gargi/Sarojini)', pos: [60, 0, 30], buildingId: 'hostel-gargi-sarojini' }
};

// Bidirectional edges with walkway weights
export const NAV_EDGES = [
  // North Spine (Gate 1 to Auditorium & Cafeterias)
  ['node-gate1', 'node-junction-gate1'],
  ['node-junction-gate1', 'node-atm-plaza'],
  ['node-atm-plaza', 'node-temple-plaza'],
  ['node-junction-gate1', 'node-junction-central-north'],
  ['node-junction-central-north', 'node-audi'],
  ['node-junction-central-north', 'node-cafe'],
  ['node-junction-central-north', 'node-snack'],
  ['node-junction-central-north', 'node-junction-central-mid'],

  // West Connections
  ['node-temple-plaza', 'node-west-north'],
  ['node-cafe', 'node-west-north'],
  ['node-west-north', 'node-tbi'],
  ['node-west-north', 'node-chandragupt'],
  ['node-west-north', 'node-west-mid'],
  ['node-west-mid', 'node-tagore'],
  ['node-west-mid', 'node-gate2'],
  ['node-west-mid', 'node-block-a'],
  ['node-west-mid', 'node-block-e'],
  ['node-west-mid', 'node-west-south'],
  ['node-west-south', 'node-aryabhatta'],
  ['node-west-south', 'node-cvraman'],
  ['node-west-south', 'node-west-sports'],
  ['node-west-south', 'node-junction-central-south'],

  // East Connections
  ['node-snack', 'node-east-north'],
  ['node-east-north', 'node-ksop'],
  ['node-east-north', 'node-dispensary'],
  ['node-east-north', 'node-east-mid'],
  ['node-east-mid', 'node-block-d'],
  ['node-east-mid', 'node-block-h'],
  ['node-east-mid', 'node-dispensary'],
  ['node-east-mid', 'node-east-south'],
  ['node-east-south', 'node-girls-hostel'],
  ['node-east-south', 'node-east-courts'],
  ['node-east-south', 'node-junction-central-south'],

  // Central Hub Intersections
  ['node-junction-central-north', 'node-block-b'],
  ['node-junction-central-north', 'node-block-c'],
  ['node-junction-central-mid', 'node-block-a'],
  ['node-junction-central-mid', 'node-block-b'],
  ['node-junction-central-mid', 'node-block-c'],
  ['node-junction-central-mid', 'node-block-d'],
  ['node-junction-central-mid', 'node-block-e'],
  ['node-junction-central-mid', 'node-block-f'],
  ['node-junction-central-mid', 'node-block-g'],
  ['node-junction-central-mid', 'node-block-h'],
  ['node-junction-central-mid', 'node-junction-central-south'],

  // South & Sports Connections
  ['node-junction-central-south', 'node-oat'],
  ['node-junction-central-south', 'node-junction-sports-north'],
  ['node-junction-sports-north', 'node-west-sports'],
  ['node-junction-sports-north', 'node-east-courts'],
  ['node-junction-sports-north', 'node-gate3']
];
