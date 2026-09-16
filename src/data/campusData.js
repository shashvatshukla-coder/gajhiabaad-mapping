// Comprehensive Database of KIET Group of Institutions (Ghaziabad / Delhi-NCR)
// Campus scale: 1 unit ~ 2.5 meters. Campus grounds approx 260x220 units (~650m x 550m, 21.56 acres)

export const CAMPUS_CATEGORIES = [
  { id: 'all', name: 'All Locations', icon: 'Layers' },
  { id: 'academic', name: 'Academic Blocks', icon: 'GraduationCap' },
  { id: 'hostel', name: 'Hostels', icon: 'Home' },
  { id: 'food', name: 'Food & Cafeterias', icon: 'Coffee' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Trophy' },
  { id: 'auditorium', name: 'Auditoriums & Events', icon: 'Mic' },
  { id: 'innovation', name: 'Incubator & Labs', icon: 'Zap' },
  { id: 'facility', name: 'Gates & Facilities', icon: 'ShieldCheck' }
];

export const BUILDINGS_DATA = [
  // ================= ACADEMIC BLOCKS =================
  {
    id: 'block-a',
    name: 'Block A (Administrative Block)',
    shortName: 'Block A',
    code: 'A',
    category: 'academic',
    position: [-45, 0, -25],
    dimensions: [22, 14, 18],
    floorsCount: 4,
    color: '#3b82f6',
    accentColor: '#1d4ed8',
    roofColor: '#1e3a8a',
    tag: 'Admin & Director Office',
    icon: 'Building',
    description: 'The administrative headquarters of KIET Deemed to be University. Houses the Director General\'s Office, Registrar, Dean Academics, Accounts Department, and high-tech Board Rooms.',
    highlights: ['Director General Office', 'Registrar & Deans', 'A-Block Conference Hall', 'Accounts & Finance', 'Central Board Room'],
    departments: ['Central Administration', 'Academic Office', 'Student Welfare Cell', 'Human Resources'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Central Reception & Helpdesk', 'Visitor Lounge', 'Accounts & Fee Counter', 'Registrar Office', 'Security Office']
      },
      {
        floor: '1st Floor',
        rooms: ['Director General Secretariat', 'Dean Academics Suite', 'Dean Student Affairs (DSA)', 'Conference Room 101']
      },
      {
        floor: '2nd Floor',
        rooms: ['A-Block Conference Hall (Cap: 200)', 'Examination Control Cell', 'Quality Assurance (IQAC)', 'Executive Meeting Room']
      },
      {
        floor: '3rd Floor',
        rooms: ['International Relations Office', 'Corporate Relations Cell', 'Deans of Research & Consultancy', 'Server Room']
      }
    ]
  },
  {
    id: 'block-b',
    name: 'Block B (Central Library & Electrical Engg)',
    shortName: 'Block B',
    code: 'B',
    category: 'academic',
    position: [-18, 0, -32],
    dimensions: [24, 16, 20],
    floorsCount: 4,
    color: '#0284c7',
    accentColor: '#0369a1',
    roofColor: '#075985',
    tag: 'Central Library & EEE/EN',
    icon: 'BookOpen',
    description: 'Home to the KIET Knowledge Resource Centre (Central Library) spanning multiple air-conditioned floors with over 1.5 lakh books, digital repositories, and the Department of Electrical & Electronics Engineering.',
    highlights: ['KIET Knowledge Resource Centre', 'Digital E-Library & Delnet', 'Power Electronics Lab', 'Applied Sciences Labs', 'Quiet Study Halls'],
    departments: ['Electrical & Electronics Engg (EN)', 'Applied Sciences (Physics & Chemistry)', 'Humanities & Social Sciences'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Library Circulation Desk', 'Stack Area 1 (Engineering & Tech)', 'Reading Hall A', 'Photocopy & Print Center']
      },
      {
        floor: '1st Floor',
        rooms: ['Digital Library & Online Journals Lab (60 PCs)', 'Periodicals & Magazines Section', 'Reference Book Wing']
      },
      {
        floor: '2nd Floor',
        rooms: ['Electrical Circuits Lab', 'Power Electronics & Drives Lab (PED)', 'Simulation Lab (MATLAB)', 'EN Faculty Cabins']
      },
      {
        floor: '3rd Floor',
        rooms: ['Engineering Physics Lab', 'Engineering Chemistry Lab', 'Language & Professional Communication Lab', 'HOD EN Office']
      }
    ]
  },
  {
    id: 'block-c',
    name: 'Block C (Electronics & Communication Engg)',
    shortName: 'Block C',
    code: 'C',
    category: 'academic',
    position: [12, 0, -30],
    dimensions: [22, 14, 18],
    floorsCount: 4,
    color: '#06b6d4',
    accentColor: '#0891b2',
    roofColor: '#164e63',
    tag: 'ECE Department & VLSI',
    icon: 'Cpu',
    description: 'Dedicated to Electronics and Communication Engineering (ECE) with cutting-edge semiconductor labs, RF & Microwave testing equipment, Embedded IoT suites, and robotics prototyping.',
    highlights: ['VLSI Design Center (Cadence/Synopsys)', 'Microwave & Optical Comm Lab', 'Embedded Systems & IoT Lab', 'Linear Integrated Circuits Lab', 'Advanced Signal Processing Lab'],
    departments: ['Electronics & Communication Engg (ECE)', 'IoT & Robotics Research Hub'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Electronic Devices & Circuits (EDC) Lab', 'Analog Electronics Lab', 'ECE Seminar Hall C-01']
      },
      {
        floor: '1st Floor',
        rooms: ['Linear Integrated Circuits (LIC) Lab', 'Pulse & Digital Circuits Lab', 'HOD ECE Office', 'Faculty Cabins']
      },
      {
        floor: '2nd Floor',
        rooms: ['Microwave & Antenna Engg Lab (MWE)', 'Optical Communication Lab', 'Digital Signal Processing (DSP) Lab']
      },
      {
        floor: '3rd Floor',
        rooms: ['VLSI & ASIC Design Suite', 'Embedded Systems & IoT Research Center', 'Smart Sensor Networks Lab']
      }
    ]
  },
  {
    id: 'block-d',
    name: 'Block D (Mechanical & Civil Engineering)',
    shortName: 'Block D',
    code: 'D',
    category: 'academic',
    position: [42, 0, -26],
    dimensions: [26, 13, 20],
    floorsCount: 3,
    color: '#64748b',
    accentColor: '#475569',
    roofColor: '#334155',
    tag: 'Mechanical & Civil Labs',
    icon: 'Wrench',
    description: 'Heavy engineering complex housing state-of-the-art CNC machining centers, thermal power labs, materials testing machinery, wind tunnels, and civil structural analysis equipment.',
    highlights: ['CNC & Advanced Machining Center', 'Thermal & Heat Transfer Lab', 'Material Testing & Metallurgy', 'Fluid Mechanics & Hydraulics', 'Civil Surveying & Geotech Lab'],
    departments: ['Mechanical Engineering (ME)', 'Civil Engineering (CE)'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Machine Tools & Workshop (Lathes, Milling, Shapers)', 'Foundry & Welding Bay', 'Fluid Mechanics Flume Lab']
      },
      {
        floor: '1st Floor',
        rooms: ['CNC Machining Center & Robotic Arm', 'Strength of Materials Lab', 'HOD Mechanical Office', 'Faculty Lounge']
      },
      {
        floor: '2nd Floor',
        rooms: ['CAD/CAM Modeling Studio (SolidWorks/CATIA)', 'Thermal Engg & IC Engine Test Rigs', 'Civil Concrete & Geotechnical Lab']
      }
    ]
  },
  {
    id: 'block-e',
    name: 'Block E (Computer Science & Engineering)',
    shortName: 'Block E',
    code: 'E',
    category: 'academic',
    position: [-38, 0, 5],
    dimensions: [25, 17, 22],
    floorsCount: 5,
    color: '#8b5cf6',
    accentColor: '#7c3aed',
    roofColor: '#5b21b6',
    tag: 'CSE & AI/ML Hub',
    icon: 'Terminal',
    description: 'The premier Computing center at KIET housing High Performance Computing clusters, Artificial Intelligence & Machine Learning Innovation labs, cloud infrastructure, and 12+ computer laboratories.',
    highlights: ['High-Performance Computing (HPC) Cluster', 'NVIDIA AI/Deep Learning Lab', 'Cloud Computing & DevOps Lab', 'Smart Classrooms', 'CSE Seminar Hall'],
    departments: ['Computer Science & Engineering (CSE)', 'CSE - Artificial Intelligence & ML', 'CSE - Data Science'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Computing Center 1 & 2 (120 Nodes)', 'CSE Department Helpdesk', 'Server & Network Operation Center']
      },
      {
        floor: '1st Floor',
        rooms: ['HOD CSE Office', 'AI & Machine Learning Research Center (GPU Enabled)', 'Data Science & Big Data Lab']
      },
      {
        floor: '2nd Floor',
        rooms: ['Cloud Computing & Virtualization Lab', 'Algorithm & Data Structures Lab', 'Smart Classrooms E-201 to E-206']
      },
      {
        floor: '3rd Floor',
        rooms: ['High-Performance Computing (HPC) Cluster', 'Open Source Software Development Lab', 'Faculty Cubicles']
      },
      {
        floor: '4th Floor',
        rooms: ['E-Block Smart Seminar Hall', 'Capstone Project Innovation Lab', 'Competitive Coding Arena']
      }
    ]
  },
  {
    id: 'block-f',
    name: 'Block F (Information Technology & MCA)',
    shortName: 'Block F',
    code: 'F',
    category: 'academic',
    position: [-10, 0, 8],
    dimensions: [23, 15, 20],
    floorsCount: 4,
    color: '#ec4899',
    accentColor: '#db2777',
    roofColor: '#9d174d',
    tag: 'IT & MCA Department',
    icon: 'Laptop',
    description: 'Home to the Department of Information Technology and Department of Computer Applications (MCA), focused on software engineering, cybersecurity, full-stack web, and app development.',
    highlights: ['Cyber Security & Ethical Hacking Lab', 'Full-Stack Web Dev Studio', 'Mobile Application Dev Lab', 'MCA Advanced Systems Lab'],
    departments: ['Information Technology (IT)', 'Computer Applications (MCA)'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['IT Lab 1 & 2', 'Web Technology Lab', 'IT Reception & Notice Board']
      },
      {
        floor: '1st Floor',
        rooms: ['HOD IT Office', 'Cyber Security & Forensics Lab', 'Software Engineering Lab']
      },
      {
        floor: '2nd Floor',
        rooms: ['HOD MCA Office', 'MCA Advanced Software Systems Lab', 'Database Management Lab']
      },
      {
        floor: '3rd Floor',
        rooms: ['IT & MCA Project Incubation Lab', 'Mobile App Development Lab (Android/iOS)', 'Classrooms F-301 to F-305']
      }
    ]
  },
  {
    id: 'block-g',
    name: 'Block G (School of Management - MBA)',
    shortName: 'Block G',
    code: 'G',
    category: 'academic',
    position: [20, 0, 10],
    dimensions: [20, 14, 18],
    floorsCount: 3,
    color: '#f59e0b',
    accentColor: '#d97706',
    roofColor: '#b45309',
    tag: 'MBA & Management School',
    icon: 'Briefcase',
    description: 'Dedicated building for the Department of Management Studies (MBA) featuring executive case-study lecture halls, finance simulation trading lab, and GD/PI personal interview suites.',
    highlights: ['MBA Executive Conference Hall', 'Financial Modeling & Analytics Lab', 'Harvard Case Study Classrooms', 'Mock Boardroom & GD Rooms'],
    departments: ['Department of Management Studies (MBA)'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['MBA Reception & Lobby', 'Case Study Room 1', 'Corporate Placement Interaction Room']
      },
      {
        floor: '1st Floor',
        rooms: ['MBA Conference Hall (Cap: 150)', 'HOD MBA Office', 'Financial Markets Simulation Lab']
      },
      {
        floor: '2nd Floor',
        rooms: ['Executive Classrooms G-201 to G-204', 'Marketing & HR Specialization Studio', 'Faculty Cabins']
      }
    ]
  },
  {
    id: 'block-h',
    name: 'Block H (Advanced Labs & Centers of Excellence)',
    shortName: 'Block H',
    code: 'H',
    category: 'innovation',
    position: [48, 0, 8],
    dimensions: [24, 15, 20],
    floorsCount: 4,
    color: '#10b981',
    accentColor: '#059669',
    roofColor: '#065f46',
    tag: 'Centers of Excellence & Apple Lab',
    icon: 'Award',
    description: 'Flagship industrial collaboration hub hosting global industry-sponsored Centers of Excellence, including Mercedes-Benz ADAM, Apple iOS Academy, and D-Link Networking Academy.',
    highlights: ['Mercedes-Benz ADAM Center', 'Apple iOS Development Center', 'D-Link Networking Lab', 'Industrial Automation Lab', 'Robotics & AR/VR Lab'],
    departments: ['Centers of Excellence (CoE)', 'Industry Partnership Cell', 'Advanced Mechatronics'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Mercedes-Benz ADAM Advanced Training Center', 'Automotive Diagnostic Bays', 'Vehicle Telematics Lab']
      },
      {
        floor: '1st Floor',
        rooms: ['Apple iOS Developer Academy (iMac Suite)', 'Swift App Dev Testing Lab', 'UI/UX Design Studio']
      },
      {
        floor: '2nd Floor',
        rooms: ['D-Link Authorized Networking Academy', 'Industrial Automation & PLC Lab', 'Robotics & Drone Flight Test Zone']
      },
      {
        floor: '3rd Floor',
        rooms: ['AR/VR Immersive Experience Lab', 'Smart EV Charging & Battery Research Lab', 'Patent Facilitation Cell']
      }
    ]
  },
  {
    id: 'ksop-block',
    name: 'KSOP (KIET School of Pharmacy)',
    shortName: 'KSOP Pharmacy',
    code: 'KSOP',
    category: 'academic',
    position: [35, 0, -55],
    dimensions: [24, 14, 20],
    floorsCount: 4,
    color: '#14b8a6',
    accentColor: '#0d9488',
    roofColor: '#115e59',
    tag: 'School of Pharmacy',
    icon: 'FlaskConical',
    description: 'Premier PCI-approved pharmaceutical institution with certified pharmacology, pharmaceutics, pharmacognosy research laboratories, medicinal herb garden, and sterile pilot plant.',
    highlights: ['Pharmaceutics & Formulation Lab', 'Pharmacology & Toxicology Lab', 'Medicinal Chemistry Lab', 'Pharmacognosy & Herbarium', 'KSOP Conference Hall'],
    departments: ['Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry', 'Pharmacognosy'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Pharmaceutics Pilot Plant', 'Machine Room', 'Central Pharmacy Store', 'Medicinal Botanical Garden']
      },
      {
        floor: '1st Floor',
        rooms: ['Pharmaceutical Chemistry Lab I & II', 'Central Instrumentation Facility (HPLC/UV-Vis)', 'Dean KSOP Office']
      },
      {
        floor: '2nd Floor',
        rooms: ['Pharmacology & Animal Physiology Lab', 'Pharmacognosy & Phytochemistry Lab', 'KSOP Seminar Hall']
      },
      {
        floor: '3rd Floor',
        rooms: ['Pharmacy Practice & Clinical Lab', 'Pharmaceutical Analysis Lab', 'Research Scholar Labs']
      }
    ]
  },
  {
    id: 'tbi-incubator',
    name: 'TBI-KIET (Technology Business Incubator)',
    shortName: 'TBI Incubator',
    code: 'TBI',
    category: 'innovation',
    position: [-52, 0, -52],
    dimensions: [22, 12, 18],
    floorsCount: 3,
    color: '#f97316',
    accentColor: '#ea580c',
    roofColor: '#c2410c',
    tag: 'Startup & Innovation Hub',
    icon: 'Sparkles',
    description: 'Govt. of India NSTEDB-supported startup incubator fostering student entrepreneurship, prototyping, seed funding, patenting, and venture incubation. Supported 120+ successful startups.',
    highlights: ['Govt. of India NSTEDB Supported', 'Startup Co-Working Spaces', 'Rapid Prototyping FabLab (3D Printers)', 'Seed Capital & Mentorship Wing', 'Patent Filing Cell'],
    departments: ['Startup Incubation', 'Entrepreneurship Development Cell (EDC)', 'Intellectual Property Rights Cell'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Startup Incubatee Workspace Pods', 'Rapid Prototyping FabLab (3D Printers & Laser Cutters)', 'CEO TBI Office']
      },
      {
        floor: '1st Floor',
        rooms: ['Investor Pitch Boardroom', 'Mentorship & Venture Advisory Rooms', 'Co-Working Lounge']
      },
      {
        floor: '2nd Floor',
        rooms: ['Patent Support & IPR Office', 'Student E-Cell Headquarters', 'Multimedia Pitch Studio']
      }
    ]
  },

  // ================= AUDITORIUMS & EVENTS =================
  {
    id: 'central-auditorium',
    name: 'Central Auditorium & Cultural Center',
    shortName: 'Central Auditorium',
    code: 'AUDI',
    category: 'auditorium',
    position: [0, 0, -62],
    dimensions: [30, 16, 24],
    floorsCount: 2,
    color: '#e11d48',
    accentColor: '#be123c',
    roofColor: '#881337',
    tag: '600+ Seater Main Audi',
    icon: 'Tv',
    description: 'Grand 600+ capacity fully air-conditioned auditorium with acoustic wall panelling, motorized stage lighting, HD projection, green rooms, and surround audio for university convocations and national conferences.',
    highlights: ['600+ Seating Capacity', 'Acoustic Soundproofing', 'Automated Stage Lighting', 'VIP Green Rooms', 'Audio/Visual Control Booth'],
    departments: ['Cultural Affairs', 'University Events Committee'],
    floors: [
      {
        floor: 'Ground Floor',
        rooms: ['Main Auditorium Hall (Orchestra Level)', 'Grand Stage & Proscenium', 'VIP Green Rooms (Left/Right)', 'AV Control Booth']
      },
      {
        floor: '1st Floor',
        rooms: ['Balcony Seating Tier (200 Seats)', 'Technical Spotlight Bridge', 'Conference VIP Lounge']
      }
    ]
  },
  {
    id: 'open-air-theatre',
    name: 'Open Air Theatre (OAT Amphitheatre)',
    shortName: 'OAT Amphitheatre',
    code: 'OAT',
    category: 'auditorium',
    position: [-10, 0, 48],
    dimensions: [26, 6, 26],
    floorsCount: 1,
    color: '#d97706',
    accentColor: '#b45309',
    roofColor: '#78350f',
    tag: 'Cultural Stage & EPOQUE Arena',
    icon: 'Music',
    description: 'Stepped amphitheatre with a large performance stage, seating over 1500 students for annual mega-fests EPOQUE, Innotech, music rock-shows, dance competitions, and street plays.',
    highlights: ['1500+ Student Capacity', 'Elevated Concert Stage', 'Stepped Lawn Seating', 'Acoustic Back-wall', 'Festivals & DJ Nights Arena'],
    departments: ['Student Activity Council (SAC)', 'Music, Drama & Dance Clubs'],
    floors: [
      {
        floor: 'Stage Level',
        rooms: ['Performance Stage (12m x 8m)', 'Backstage Dressing Rooms', 'Sound & DJ Console Deck']
      }
    ]
  },

  // ================= HOSTELS =================
  {
    id: 'hostel-aryabhatta',
    name: 'Aryabhatta Hostel (Boys Hostel 1)',
    shortName: 'Aryabhatta Hostel',
    code: 'BH1',
    category: 'hostel',
    position: [-85, 0, 15],
    dimensions: [24, 18, 22],
    floorsCount: 4,
    color: '#3b82f6',
    accentColor: '#2563eb',
    roofColor: '#1e40af',
    tag: 'First Year Boys Hostel',
    icon: 'Home',
    description: 'Dedicated modern residential hostel for 1st Year B.Tech boys with 24/7 warden security, high-speed Wi-Fi, air-cooled rooms, indoor games, and study halls.',
    highlights: ['200+ Air-Cooled Rooms', '24/7 Security & CCTV', 'Table Tennis & Carrom Room', 'Wi-Fi Enabled Study Lounge', 'Hostel Warden Office'],
    departments: ['Hostel Administration (Boys Wing)'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Warden Office', 'Common Room & TV Lounge', 'Indoor Games Zone', 'Dining Hall Access'] },
      { floor: '1st Floor', rooms: ['Student Rooms 101 to 140', 'Water Purifier Station', 'Washrooms Wing'] },
      { floor: '2nd Floor', rooms: ['Student Rooms 201 to 240', 'Study Room', 'Balcony Corridor'] },
      { floor: '3rd Floor', rooms: ['Student Rooms 301 to 340', 'Reading Lounge', 'Rooftop Access'] }
    ]
  },
  {
    id: 'hostel-cv-raman',
    name: 'C.V. Raman Hostel (Boys Hostel 2)',
    shortName: 'CV Raman Hostel',
    code: 'BH2',
    category: 'hostel',
    position: [-85, 0, 45],
    dimensions: [24, 18, 22],
    floorsCount: 4,
    color: '#0284c7',
    accentColor: '#0369a1',
    roofColor: '#075985',
    tag: 'Boys Hostel 2',
    icon: 'Home',
    description: 'Spacious residential hostel for senior engineering boys equipped with gym, reading rooms, fast fiber internet, solar water heaters, and power backup.',
    highlights: ['Gymnasium & Fitness Area', 'Solar Water Heating', 'RO Drinking Water', 'Caretaker Desk'],
    departments: ['Hostel Administration'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Hostel Gym & Weight Training', 'TV Room', 'Warden Office'] },
      { floor: '1st Floor', rooms: ['Rooms 101-135', 'Common Washrooms'] },
      { floor: '2nd Floor', rooms: ['Rooms 201-235', 'Silent Study Area'] },
      { floor: '3rd Floor', rooms: ['Rooms 301-335', 'Recreation Room'] }
    ]
  },
  {
    id: 'hostel-tagore-vivekanand',
    name: 'Tagore & Vivekanand Hostels (BH 3 & 4)',
    shortName: 'Tagore / Vivekanand',
    code: 'BH3-4',
    category: 'hostel',
    position: [-85, 0, -25],
    dimensions: [26, 18, 24],
    floorsCount: 4,
    color: '#0ea5e9',
    accentColor: '#0284c7',
    roofColor: '#0369a1',
    tag: 'Senior Boys Hostels',
    icon: 'Home',
    description: 'Twin hostel block for 3rd and 4th year undergraduate and postgraduate boys, situated close to the sports ground and central boys mess.',
    highlights: ['Twin Wing Architecture', 'Attached Balconies', 'Badminton Court in Quad', 'Night Canteen Access'],
    departments: ['Hostel Administration'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Twin Quad Entrance', 'Tagore Warden Office', 'Vivekanand Warden Office', 'Night Canteen'] },
      { floor: '1st - 3rd Floors', rooms: ['Over 180 Student Living Rooms', 'Study Lounges'] }
    ]
  },
  {
    id: 'hostel-chandragupt-chanakya',
    name: 'Chandragupt & Chanakya Hostels (BH 5 & 6)',
    shortName: 'Chandragupt / Chanakya',
    code: 'BH5-6',
    category: 'hostel',
    position: [-85, 0, -58],
    dimensions: [25, 18, 22],
    floorsCount: 4,
    color: '#38bdf8',
    accentColor: '#0284c7',
    roofColor: '#0c4a6e',
    tag: 'Senior Boys Complex',
    icon: 'Home',
    description: 'Senior boys hostel complex with single and double occupancy rooms, high-speed Wi-Fi, and scenic views of the lush green campus boundaries.',
    highlights: ['Single/Double Occupancy Options', 'High-Speed Wi-Fi', 'Laundry Facility'],
    departments: ['Hostel Administration'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Reception & Security', 'Common Hall', 'Laundromat Room'] },
      { floor: '1st - 3rd Floors', rooms: ['Senior Student Rooms', 'Study Cubicles'] }
    ]
  },
  {
    id: 'hostel-gargi-sarojini',
    name: 'Gargi, Sarojini & Saraswati Hostels (Girls Hostels)',
    shortName: 'Girls Hostels Complex',
    code: 'GH-COMPLEX',
    category: 'hostel',
    position: [75, 0, 30],
    dimensions: [32, 18, 28],
    floorsCount: 4,
    color: '#ec4899',
    accentColor: '#db2777',
    roofColor: '#831843',
    tag: 'Girls Hostels & Garden',
    icon: 'Home',
    description: 'Secure, gated girls residential complex comprising Gargi, Sarojini, and Saraswati hostels with round-the-clock biometric security, dedicated dining mess, gym, beauty parlour, and landscaped garden quadrangle.',
    highlights: ['3 Blocks (Gargi, Sarojini, Saraswati)', 'Dedicated Girls Mess', 'In-hostel Gym & Badminton Court', '24/7 Female Warden & Guard Security', 'Biometric Turnstiles'],
    departments: ['Girls Hostel Administration'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Chief Matron & Warden Office', 'Central Girls Dining Mess (Cap: 400)', 'Common TV & Music Lounge', 'Visitor Lounge'] },
      { floor: '1st Floor', rooms: ['Gargi Wing (Rooms 101-140)', 'Sarojini Wing (Rooms 101-140)', 'Fitness Gym'] },
      { floor: '2nd Floor', rooms: ['Saraswati Wing (Rooms 201-240)', 'Reading & Library Hall', 'Indoor Badminton Court'] },
      { floor: '3rd Floor', rooms: ['Senior Girls Rooms', 'Terrace Solar Heaters & Laundry Area'] }
    ]
  },

  // ================= FOOD & CAFETERIAS =================
  {
    id: 'central-cafeteria',
    name: 'Central Student Cafeteria & Food Court',
    shortName: 'Central Cafeteria',
    code: 'CAFE',
    category: 'food',
    position: [-25, 0, -65],
    dimensions: [22, 9, 18],
    floorsCount: 2,
    color: '#f97316',
    accentColor: '#ea580c',
    roofColor: '#9a3412',
    tag: 'Multi-Cuisine Food Court',
    icon: 'Utensils',
    description: 'Vibrant two-storey dining venue serving freshly prepared Indian meals, South Indian dosas, Chinese delicacies, shakes, and bakery snacks with indoor and outdoor umbrella seating.',
    highlights: ['Multi-Cuisine Menu', 'Seating for 300+ Students', 'Air-Conditioned Upper Deck', 'Outdoor Lawn Seating', 'Digital Cashless Ordering'],
    departments: ['Campus Catering Services'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Main Counter (Thali, Snacks, South Indian)', 'Juice & Shake Bar', 'Open Dining Hall'] },
      { floor: '1st Floor', rooms: ['AC Lounge & Pizza/Burger Station', 'Faculty Dining Section', 'Balcony Deck'] }
    ]
  },
  {
    id: 'ccd-amul-nescafe',
    name: 'Café Hub (CCD, Amul & Nescafe Kiosks)',
    shortName: 'CCD & Snack Plaza',
    code: 'SNACK',
    category: 'food',
    position: [12, 0, -60],
    dimensions: [16, 6, 12],
    floorsCount: 1,
    color: '#d97706',
    accentColor: '#b45309',
    roofColor: '#78350f',
    tag: 'Coffee, Ice Cream & Snacks',
    icon: 'Coffee',
    description: 'Popular student hangout hub featuring Café Coffee Day (CCD) express counter, Amul ice cream parlour, Nescafe hot brew kiosk, and waffle bar.',
    highlights: ['Café Coffee Day (CCD)', 'Amul Ice Cream & Dairy Bar', 'Nescafe Hot Coffee & Maggi Point', 'Outdoor Canopy Seating'],
    departments: ['Hospitality & Retail'],
    floors: [
      { floor: 'Ground Level', rooms: ['CCD Counter', 'Amul Kiosk', 'Nescafe Stall', 'Canopy Table Seating'] }
    ]
  },

  // ================= SPORTS & RECREATION =================
  {
    id: 'cricket-ground',
    name: 'KIET Sports Arena (Cricket & Football Stadium)',
    shortName: 'Cricket & Football Ground',
    code: 'STADIUM',
    category: 'sports',
    position: [-55, 0, 68],
    dimensions: [48, 4, 38],
    floorsCount: 1,
    color: '#22c55e',
    accentColor: '#16a34a',
    roofColor: '#15803d',
    tag: 'Cricket Turf & Football Field',
    icon: 'Trophy',
    description: 'Full-sized lush green grass stadium equipped for national-level cricket matches with turf pitch, football field, 400m running track, pavilion, and stadium floodlights.',
    highlights: ['Full Size Turf Cricket Pitch', 'FIFA-Standard Football Field', '400m Athletics Track', 'Spectator Pavilion', 'Night Floodlight System'],
    departments: ['Physical Education & Sports Department'],
    floors: [
      { floor: 'Ground Level', rooms: ['Main Playing Field', 'Player Dugouts', 'Sports Equipment Store', 'Referee/Scoreboard Room'] }
    ]
  },
  {
    id: 'sports-complex-courts',
    name: 'Synthetic Basketball, Volleyball & Tennis Courts',
    shortName: 'Basketball & Tennis Courts',
    code: 'COURTS',
    category: 'sports',
    position: [25, 0, 62],
    dimensions: [32, 6, 26],
    floorsCount: 1,
    color: '#0284c7',
    accentColor: '#0369a1',
    roofColor: '#075985',
    tag: 'Floodlit Synthetic Courts',
    icon: 'Activity',
    description: 'World-class synthetic basketball court, dual volleyball courts, and lawn tennis court with professional night lighting for inter-college tournaments.',
    highlights: ['2 Synthetic Basketball Courts', 'Lawn Tennis Court', '2 Volleyball Courts', 'Tournament Floodlighting'],
    departments: ['Sports Department'],
    floors: [
      { floor: 'Court Level', rooms: ['Basketball Arena 1 & 2', 'Tennis Court', 'Volleyball Grounds', 'Seating Bleachers'] }
    ]
  },

  // ================= GATES & FACILITIES =================
  {
    id: 'gate-1-main',
    name: 'Main Gate 1 (NH-58 Delhi-Meerut Highway)',
    shortName: 'Main Gate (Gate 1)',
    code: 'GATE1',
    category: 'facility',
    position: [0, 0, -100],
    dimensions: [28, 8, 8],
    floorsCount: 1,
    color: '#0284c7',
    accentColor: '#0369a1',
    roofColor: '#0c4a6e',
    tag: 'NH-58 Highway Entrance',
    icon: 'DoorOpen',
    description: 'Grand monumental entrance gate situated on NH-58 Delhi-Meerut Road. Equipped with electronic boom barriers, visitor registration center, and 24/7 armed security.',
    highlights: ['NH-58 Main Highway Access', 'Visitor Pass Counter', 'Security Guard Post', 'Boom Barriers & RFID Vehicle Scanner'],
    departments: ['Campus Security & Transport'],
    floors: [
      { floor: 'Ground Level', rooms: ['Main Gate Arch', 'Visitor Registration Booth', 'Security Control Room', 'Waiting Kiosk'] }
    ]
  },
  {
    id: 'gate-2-hostel',
    name: 'Gate 2 (Hostels & Delivery Gate)',
    shortName: 'Gate 2 (Hostel Gate)',
    code: 'GATE2',
    category: 'facility',
    position: [-100, 0, -20],
    dimensions: [14, 6, 6],
    floorsCount: 1,
    color: '#64748b',
    accentColor: '#475569',
    roofColor: '#334155',
    tag: 'West Side Entrance',
    icon: 'Shield',
    description: 'West side access gate used primarily by hostel residents, logistics supply, and college delivery services.',
    highlights: ['Direct Hostel Access', 'Logistics Entry', 'Security Post'],
    departments: ['Campus Security'],
    floors: [
      { floor: 'Ground Level', rooms: ['Gate Guard Cabin', 'Vehicle Verification Post'] }
    ]
  },
  {
    id: 'gate-3-sports',
    name: 'Gate 3 (Sports & Parking Exit)',
    shortName: 'Gate 3 (Back Gate)',
    code: 'GATE3',
    category: 'facility',
    position: [0, 0, 95],
    dimensions: [14, 6, 6],
    floorsCount: 1,
    color: '#64748b',
    accentColor: '#475569',
    roofColor: '#334155',
    tag: 'South Side / Sports Gate',
    icon: 'Shield',
    description: 'South gate adjacent to the sports fields and secondary parking for event logistics.',
    highlights: ['Sports Arena Access', 'Emergency Evacuation Route'],
    departments: ['Campus Security'],
    floors: [
      { floor: 'Ground Level', rooms: ['Security Booth', 'Gate Barrier'] }
    ]
  },
  {
    id: 'campus-temple',
    name: 'Campus Temple (Shri Shiv & Saraswati Mandir)',
    shortName: 'Campus Mandir',
    code: 'TEMPLE',
    category: 'facility',
    position: [-50, 0, -85],
    dimensions: [12, 10, 12],
    floorsCount: 1,
    color: '#f59e0b',
    accentColor: '#d97706',
    roofColor: '#78350f',
    tag: 'Spiritual Center & Garden',
    icon: 'Sun',
    description: 'Peaceful temple and meditation garden dedicated to Lord Shiva and Goddess Saraswati, providing a serene environment for contemplation and blessings.',
    highlights: ['Shiva & Saraswati Sanctuaries', 'Landscaped Floral Garden', 'Morning & Evening Aarti', 'Peaceful Meditation Lawn'],
    departments: ['Campus Welfare & Heritage'],
    floors: [
      { floor: 'Sanctum Level', rooms: ['Main Mandir Hall', 'Idol Sanctum', 'Prasad Counter', 'Flower Garden Pathway'] }
    ]
  },
  {
    id: 'dispensary-medical',
    name: 'Medical Health Center & 24/7 Dispensary',
    shortName: 'Dispensary & Health Center',
    code: 'MED',
    category: 'facility',
    position: [62, 0, -25],
    dimensions: [15, 8, 14],
    floorsCount: 1,
    color: '#ef4444',
    accentColor: '#dc2626',
    roofColor: '#991b1b',
    tag: '24/7 Medical Care & Ambulance',
    icon: 'HeartPulse',
    description: 'On-campus medical facility with full-time resident medical officer, trained nurses, emergency trauma beds, basic pharmacy, and 24/7 dedicated ambulance.',
    highlights: ['Resident Doctor & Nurses', 'Emergency Observation Beds', '24/7 Dedicated Ambulance Service', 'Free Essential Medicines for Students'],
    departments: ['Health & Emergency Care'],
    floors: [
      { floor: 'Ground Floor', rooms: ['Doctor Consultation Chamber', 'Emergency Treatment Room', 'Pharmacy Dispensary', 'Ambulance Bay'] }
    ]
  },
  {
    id: 'atm-plaza',
    name: 'Bank & ATM Plaza (PNB & Axis Bank)',
    shortName: 'Bank & ATM Plaza',
    code: 'ATM',
    category: 'facility',
    position: [-22, 0, -90],
    dimensions: [12, 6, 10],
    floorsCount: 1,
    color: '#0284c7',
    accentColor: '#0369a1',
    roofColor: '#075985',
    tag: 'Banking & Cash Dispenser',
    icon: 'CreditCard',
    description: '24/7 ATM kiosks and campus bank extension counter offering cash deposit, withdrawal, passbook printing, and student banking support.',
    highlights: ['Punjab National Bank ATM', 'Axis Bank ATM', 'Passbook Printing Machine', '24/7 Guarded'],
    departments: ['Banking Services'],
    floors: [
      { floor: 'Ground Floor', rooms: ['ATM Kiosks 1 & 2', 'Bank Extension Counter'] }
    ]
  }
];

// Quick Camera View Presets
export const CAMERA_PRESETS = [
  {
    id: 'overview',
    name: "Bird's Eye Campus",
    icon: 'Globe',
    position: [0, 140, 130],
    target: [0, 0, 0]
  },
  {
    id: 'academic',
    name: 'Academic Blocks (A-H)',
    icon: 'GraduationCap',
    position: [0, 65, 55],
    target: [0, 0, -10]
  },
  {
    id: 'hostels',
    name: 'Hostel Zone',
    icon: 'Home',
    position: [-110, 60, 20],
    target: [-85, 0, 10]
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    icon: 'Trophy',
    position: [-20, 55, 120],
    target: [-20, 0, 65]
  },
  {
    id: 'gate',
    name: 'Main Gate (NH-58)',
    icon: 'DoorOpen',
    position: [0, 30, -145],
    target: [0, 0, -90]
  },
  {
    id: 'audi-hub',
    name: 'Auditorium & OAT',
    icon: 'Mic',
    position: [0, 50, -20],
    target: [0, 0, -50]
  }
];

// Campus Events & Festivals Hotspots
export const CAMPUS_EVENTS = [
  {
    id: 'epoque',
    name: 'EPOQUE - Annual Cultural Fest',
    date: 'February / March',
    location: 'Open Air Theatre (OAT) & Central Audi',
    targetBuildingId: 'open-air-theatre',
    tag: 'Mega Cultural Fest',
    description: 'The largest annual cultural festival of Delhi-NCR featuring celebrity musical nights, dance battles, dramatics, fashion walks, and band wars.'
  },
  {
    id: 'innotech',
    name: 'INNOTECH - National Tech Carnival',
    date: 'November',
    location: 'Block E (CSE) & TBI Incubator',
    targetBuildingId: 'block-e',
    tag: 'Tech Expo & Hackathon',
    description: 'Flagship national technical festival showcasing student hardware models, AI hackathons, robotic wars, coding sprints, and startup pitch decks.'
  },
  {
    id: 'rann',
    name: 'RANN - Annual Sports Meet',
    date: 'December',
    location: 'Sports Arena & Basketball Courts',
    targetBuildingId: 'cricket-ground',
    tag: 'Inter-College Sports',
    description: '3-day inter-collegiate sports championship with 30+ universities competing across cricket, football, basketball, track & field, and volleyball.'
  },
  {
    id: 'tedx',
    name: 'TEDx KIET',
    date: 'October',
    location: 'Central Auditorium',
    targetBuildingId: 'central-auditorium',
    tag: 'Inspirational Talks',
    description: 'Independently organized TED event featuring visionary scientists, entrepreneurs, artists, and leaders sharing world-changing ideas.'
  }
];

// Campus Quick Statistics
export const CAMPUS_STATS = {
  name: 'KIET Group of Institutions',
  subTitle: 'KIET Deemed to be University, Delhi-NCR, Ghaziabad',
  tagline: 'Empowering Minds, Transforming Futures',
  accreditation: 'NAAC A+ Grade | NBA Accredited | NIRF Top Ranked',
  area: '21.56 Acres',
  students: '6,500+ Students',
  faculty: '320+ Faculty Members',
  established: '1998',
  address: 'NH-58, Delhi-Meerut Highway, Muradnagar, Ghaziabad, Uttar Pradesh 201206',
  coordinates: '28.75257° N, 77.49851° E',
  emergency: {
    security: '+91 1234 567890',
    dispensary: '+91 1234 567891',
    ambulance: '108 / 102',
    wardenBoys: '+91 1234 567892',
    wardenGirls: '+91 1234 567893'
  }
};
