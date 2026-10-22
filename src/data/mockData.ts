import { 
  PatientRecord, 
  MedicationItem, 
  DiagnosticOrder, 
  QueueToken, 
  PharmacyStockItem, 
  DentalToothState, 
  PeriodontalRow, 
  TreatmentPhase,
  DentalLabOrder,
  DentalMaterialItem,
  OperatoryChair,
  ChatMessage
} from '../types';

export const mockGeneralPatient: PatientRecord = {
  id: 'pt-robert-vance',
  name: 'Robert Vance',
  age: 54,
  gender: 'M',
  uhid: '#MC-984210',
  dob: '14-May-1970',
  phone: '+1 (555) 392-8812',
  bloodGroup: 'O+ve',
  insurancePayer: 'BlueCross PPO',
  insurancePolicyId: '#BC-77291-A',
  allergies: ['Penicillin, Sulfonamides (Severe Anaphylaxis)'],
  chronicConditions: ['Type 2 Diabetes (6y)', 'Stage 1 HTN'],
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN-98T7p_FvXL5zVw7frUNLf_EmoN8pfMNe5CYCtyKoKFr29CGo8IQwO4B03VZPCS3us-Al1kDdGdXu7qIY0QWFv_xIdRm3YRUgmAMIFkhUlbaa9lS_fcKTfOZSWELDcdD4g6x0kWH6MKI_559McxUkIFJ1sdI1YwquJR8_kivvCuF5t5FuEW0MdHuzeAfAmQQQ_EP4A1jviQ7ky9f8Qbabsf9shEXXUjE2cMjeA6S9UIvPj6x_m4',
  vitals: {
    bp: '132/84',
    bpStatus: 'Pre-HTN',
    hr: 74,
    spo2: 98,
    temp: '98.4°F',
    bmi: 27.8,
    rbs: 142,
    recordedTime: '15m ago'
  },
  activeOpdRoom: 'Room 104',
  chiefComplaint: 'Patient presents with persistent mild polyuria and morning fatigue for past 2 weeks. Compliant with Metformin, reports occasional diet indiscretions during travel.'
};

export const mockDentalPatient: PatientRecord = {
  id: 'pt-eleanor-vance',
  name: 'Eleanor Vance',
  age: 36,
  gender: 'F',
  uhid: '#DENT-984210',
  dob: '08-Sep-1988',
  phone: '+91 98765 43210',
  bloodGroup: 'B+ve',
  insurancePayer: 'Delta Dental Premier PPO',
  insurancePolicyId: '#DPA-8422-V',
  allergies: ['Latex, Amoxicillin (Severe)', 'Penicillin'],
  chronicConditions: ['Restorative & Endo Candidate'],
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA46JiRlHA_ADzbI0sPr7_1BgfuGpRX-hAnjTk9FbBx2Wv2c7vXI0M2bBDwNS-0RdNWV7m9f0-1mEuwIJQXn8Y2CwNJD_Td0-G48HW9J8wF9_tCwJzWfKtVdldBsHkFtywFAE-l7RFcRBRAlBSI8ukVK-9Wr3eBiJ_X4Nfg59RJWyM2M0M2lkUMRtxriVefNAGlG5S9qC15VhAOV2lUaUa-wIXu-7NA1g_XxLvjCRsmluGcoNMk14o',
  vitals: {
    bp: '118/78',
    bpStatus: 'Optimal',
    hr: 72,
    spo2: 99,
    temp: '98.6°F',
    bmi: 22.4,
    rbs: 98,
    recordedTime: '10m ago'
  },
  activeOpdRoom: 'Operatory 2 (A-dec 500)',
  chiefComplaint: 'Severe spontaneous throbbing pain in upper right quadrant molar (#3 / FDI 16) on cold & mastication × 4 days'
};

export const mockActiveMedications: MedicationItem[] = [
  {
    id: 'med-1',
    name: 'Metformin HCl 500mg ER',
    dosage: '1 Tab BD',
    frequency: 'Morning & Night after food',
    duration: '90 Days',
    refills: 2,
    route: 'Oral',
    status: 'Active',
    since: '2018'
  },
  {
    id: 'med-2',
    name: 'Lisinopril 10mg',
    dosage: '1 Tab OD',
    frequency: 'Morning after breakfast',
    duration: '90 Days',
    refills: 2,
    route: 'Oral',
    status: 'Active',
    since: '2021'
  },
  {
    id: 'med-3',
    name: 'Empagliflozin (Jardiance) 10mg',
    dosage: '1 Tab OD',
    frequency: 'Morning before breakfast',
    duration: '30 Days',
    refills: 1,
    route: 'Oral',
    isNew: true,
    status: 'Active',
    since: 'Today'
  }
];

export const mockDiagnosticOrders: DiagnosticOrder[] = [
  {
    id: 'lab-1',
    name: 'HbA1c Glycated Hemoglobin (Fasting)',
    category: 'Biochemistry',
    status: 'Routine',
    selected: true
  },
  {
    id: 'lab-2',
    name: 'Serum Creatinine & Electrolytes',
    category: 'Renal',
    status: 'Renal check',
    selected: true
  },
  {
    id: 'lab-3',
    name: 'Urine Microalbumin / Creatinine Ratio',
    category: 'Renal spot test',
    status: 'Spot test',
    selected: true
  }
];

export const initialQueueTokens: QueueToken[] = [
  {
    id: 'tok-24',
    tokenNumber: 'A-24',
    patientName: 'Marcus Brody',
    age: 48,
    gender: 'Male',
    uhid: '#MC-972108',
    phone: '+1 (555) 234-9981',
    arrivalTime: '09:40 AM',
    waitTime: '1m 40s ago',
    triagePriority: 'Priority / Amber',
    chiefComplaint: 'Chest discomfort & palpitations (onset 2 days)',
    assignedDoctor: 'Dr. Sarah Jenkins',
    vitalsStatus: 'Vitals Recorded (Station 1)',
    isCalling: true,
    vitalsSummary: 'BP: 142/92 • HR: 88 bpm • SpO2: 97% • Temp: 98.6°F'
  },
  {
    id: 'tok-25',
    tokenNumber: 'A-25',
    patientName: 'Elena Rostova',
    age: 32,
    gender: 'Female',
    uhid: '#MC-984301',
    phone: '+1 (555) 774-1209',
    arrivalTime: '09:45 AM',
    waitTime: '12 mins',
    triagePriority: 'Routine / Green',
    chiefComplaint: 'Follow-up on thyroid medication & routine labs',
    assignedDoctor: 'Dr. Jenkins',
    vitalsStatus: 'Checked (118/76 • 68bpm • 99%)'
  },
  {
    id: 'tok-26',
    tokenNumber: 'A-26',
    patientName: 'David K. Miller',
    age: 67,
    gender: 'Male',
    uhid: '#MC-981240',
    phone: '+1 (555) 441-8902',
    arrivalTime: '09:50 AM',
    waitTime: '7 mins',
    triagePriority: 'Priority / Amber',
    chiefComplaint: 'Diabetic foot ulcer dressing & blood sugar review',
    assignedDoctor: 'Dr. Jenkins',
    vitalsStatus: 'Complete'
  },
  {
    id: 'tok-27',
    tokenNumber: 'A-27',
    patientName: 'Priya Sharma',
    age: 29,
    gender: 'Female',
    uhid: '#MC-985112',
    phone: '+1 (555) 902-3312',
    arrivalTime: '09:52 AM',
    waitTime: '5 mins',
    triagePriority: 'Routine (Prenatal)',
    chiefComplaint: 'Second trimester ultrasound follow-up',
    assignedDoctor: 'Dr. Jenkins',
    vitalsStatus: 'Pending (Station 2)'
  },
  {
    id: 'tok-28',
    tokenNumber: 'A-28',
    patientName: 'Arthur Pendelton',
    age: 74,
    gender: 'Male',
    uhid: '#MC-979841',
    phone: '+1 (555) 887-1100',
    arrivalTime: '09:56 AM',
    waitTime: '1 min',
    triagePriority: 'URGENT RED',
    chiefComplaint: 'Fever 102.4°F + severe chills and tachycardia',
    assignedDoctor: 'Triage Room',
    vitalsStatus: 'Initial Triage Required'
  },
  {
    id: 'tok-29',
    tokenNumber: 'A-29',
    patientName: 'Sneha Reddy',
    age: 41,
    gender: 'Female',
    uhid: '#MC-989201',
    phone: '+1 (555) 321-4455',
    arrivalTime: '10:02 AM',
    waitTime: 'Pre-registered',
    triagePriority: 'Routine (Thyroid Follow-up)',
    chiefComplaint: 'Thyroid profile discussion',
    assignedDoctor: 'Dr. Jenkins',
    vitalsStatus: 'At Intake Desk'
  }
];

export const mockPharmacyStock: PharmacyStockItem[] = [
  {
    id: 'ph-1',
    medicineName: 'Tab. Metformin 500mg ER',
    brand: 'Glucophage',
    salt: 'Metformin Hydrochloride',
    sig: 'Sig: 1 tab PO BID with meals (45 days supply)',
    batchNumber: '#B-2024-91',
    expiry: '08/2026',
    rackLocation: 'Rack: R-04-A',
    currentStock: 420,
    unit: 'strips',
    prescribedQuantity: 3,
    unitPrice: 12.00,
    verified: true
  },
  {
    id: 'ph-2',
    medicineName: 'Tab. Lisinopril 10mg',
    brand: 'Prinivil',
    salt: 'Lisinopril USP',
    sig: 'Sig: 1 tab PO OD in the morning (30 days)',
    batchNumber: '#L-99812',
    expiry: '11/2025',
    rackLocation: 'Rack: R-02-C',
    currentStock: 180,
    unit: 'strips',
    prescribedQuantity: 3,
    unitPrice: 9.50,
    verified: true
  },
  {
    id: 'ph-3',
    medicineName: 'Tab. Empagliflozin 10mg',
    brand: 'Jardiance (Innovator)',
    salt: 'Empagliflozin',
    sig: 'Sig: 1 tab PO daily in AM (28 days)',
    batchNumber: '#J-44321',
    expiry: '03/2026',
    rackLocation: 'Rack: Cold-01',
    currentStock: 45,
    unit: 'strips',
    prescribedQuantity: 1,
    unitPrice: 44.00,
    verified: true,
    isCriticalLow: true,
    genericAlternative: {
      name: 'Generic Empagliflozin (Cipla)',
      brand: 'Empagliflozin 10mg',
      savingAmount: 21.00,
      savingPercent: 47
    }
  }
];

export const mockDentalLabOrders: DentalLabOrder[] = [
  {
    id: 'lab-4029',
    patientName: 'Robert Vance',
    patientUhid: '#DNT-9821',
    rxNumber: 'Rx-4029',
    labPartner: 'Apex Precision Dental Lab',
    impressionType: '3D STL Scan (Trios 4)',
    toothTarget: 'Tooth #19 • Monolithic Zirconia',
    materialShade: 'VITA A2 (Bleach Gradient)',
    dueTime: 'Tomorrow 11:00 AM',
    courierDetail: 'Courier: BlueDart Waybill #883',
    status: 'Milled & In Transit',
    previewImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyUe-AawA61w2elM_ELmpQgsbz7fyKu7jWwCum06PrLZMM1XJQtl_Uo1_d_8-8vsiqzws2PyqbI4J-Irkivz8CDZ54KeEiZgkySUgVNnGvrQa7sRgBmUcc7VIMSxdshpr1hpa7HxrC8PWBeTpHLEGnaSksdPSXq7jxhWGIerBNvcHdLDPigwfPUq_CkudtPZfhn1kX2LuWlXOjmymADtdaYAV5-EPZUU3u-KtBMMDwvUR47kvMpcs'
  },
  {
    id: 'lab-4033',
    patientName: 'Sophia Lin',
    patientUhid: '#DNT-1044',
    rxNumber: 'Rx-4033',
    labPartner: 'In-House Milling Lab',
    impressionType: 'Alginate Cast Impression',
    toothTarget: 'Maxillary Arch • Clear Retainer',
    materialShade: 'Essix 1.0mm Thermo',
    dueTime: 'Oct 29, 04:30 PM',
    courierDetail: 'Batch: Ortho-32',
    status: 'Cast Poured'
  },
  {
    id: 'lab-4015',
    patientName: 'David K. Miller',
    patientUhid: '#DNT-8711',
    rxNumber: 'Rx-4015',
    labPartner: 'DentArt CAD Studio',
    impressionType: 'MedIT i700 Intraoral STL',
    toothTarget: 'Teeth #12, #13, #14 • 3-Unit Bridge',
    materialShade: 'E-max Lithium Disilicate (A1)',
    dueTime: 'Oct 30, 02:00 PM',
    courierDetail: 'Try-In Scheduled',
    status: 'CAD Margin Verification'
  }
];

export const mockDentalMaterials: DentalMaterialItem[] = [
  {
    id: 'mat-1',
    name: 'Straumann BLX Implant',
    category: 'Implantology',
    description: 'Size: 4.0mm x 10mm (SLActive Roxolid)',
    stockCount: 6,
    stockUnit: 'in Hub',
    lotNumber: 'Lot #BLX-88204-CH',
    expiryDate: '08/2027',
    isCritical: false
  },
  {
    id: 'mat-2',
    name: 'Geistlich Bio-Oss® Cancellous',
    category: 'Biomaterials',
    description: 'Granules: 0.25mm - 1mm (0.5g vial)',
    stockCount: 8,
    stockUnit: 'in Hub',
    lotNumber: 'Lot #BIO-4921-EU',
    expiryDate: '04/2026',
    isCritical: false
  },
  {
    id: 'mat-3',
    name: '3M Filtek Z250 Universal',
    category: 'Restorative',
    description: 'Shade: A2 (4g Syringe) • Min Buffer: 5',
    stockCount: 1,
    stockUnit: 'Syringe',
    lotNumber: 'Lot #FLT-09193A',
    expiryDate: 'Expiring in 21 days',
    isCritical: true,
    criticalMessage: 'CRITICAL: 1 REMAINING • PO Generated ($142)'
  },
  {
    id: 'mat-4',
    name: 'Lignospan Special (Lidocaine 2%)',
    category: 'Anesthetics',
    description: 'Epinephrine 1:100,000 (1.8mL Carpules)',
    stockCount: 12,
    stockUnit: 'Cartridges (0.2 Box)',
    lotNumber: 'Lot #LIG-81992-B',
    expiryDate: 'Septodont Approved Supply',
    isCritical: true,
    criticalMessage: 'CRITICAL: 12 CARTS • Express Restock'
  }
];

export const mockOperatoryChairs: OperatoryChair[] = [
  {
    id: 'chair-1',
    name: 'Restorative & Endo Suite',
    operatoryCode: 'Chair 1 • Operatory A',
    chairType: 'A-dec 500 LED Delivery',
    specialty: 'Endodontics & Restorative',
    status: 'IN USE',
    assignedDoctor: 'Dr. Sarah Jenkins',
    currentPatient: {
      name: 'Marcus Brody',
      uhid: 'DPX-88204',
      tooth: '#38',
      procedureName: 'Surgical Extraction Tooth #38 (Mesioangular Impacted)',
      elapsedSeconds: 24 * 60 + 18,
      estimatedMinutes: 45
    }
  },
  {
    id: 'chair-2',
    name: 'Hygiene & Prophylaxis',
    operatoryCode: 'Chair 2 • Operatory B',
    chairType: 'Belmont Clesta II',
    specialty: 'Dental Hygiene & Scaling',
    status: 'READY',
    assignedDoctor: 'Hygienist Mark Davis, RDH',
    turnoverDetails: {
      action: 'Sterilized & Pre-draped',
      minutesRemaining: 0
    }
  },
  {
    id: 'chair-3',
    name: 'Oral Surgery & Implant Suite',
    operatoryCode: 'Chair 3 • Operatory C',
    chairType: 'Planmeca Compact i5',
    specialty: 'Surgical & Maxillofacial',
    status: 'TURNOVER',
    assignedDoctor: 'Surg. Dr. Rao',
    turnoverDetails: {
      action: 'UV-C & Enzymatic Cycle • Suction Line Flush',
      minutesRemaining: 8
    }
  },
  {
    id: 'chair-4',
    name: 'Orthodontics & Consultations',
    operatoryCode: 'Chair 4 • Operatory D',
    chairType: 'Sirona Intego',
    specialty: 'Orthodontics & Clear Aligners',
    status: 'IDLE',
    assignedDoctor: 'Dr. A. Pillai (On Break)',
    nextAppointment: 'Token D-16 in 18m'
  }
];

export const mockTreatmentPhases: TreatmentPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    title: 'Tooth #3 Multi-Visit RCT',
    category: 'Immediate',
    description: 'Access opening, pulpectomy, bio-ceramic canal sealer & temporary Cavit seal.',
    cost: 720.00,
    statusText: 'Stat Today',
    estDuration: 'Est: 45 min'
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    title: 'Post & Core + E-max Crown',
    category: 'Prosthetic',
    description: 'Fiber post reinforcement on #3 + CAD/CAM monolithic E-max ceramic crown prep.',
    cost: 1150.00,
    statusText: 'Visit 2 & 3 (Lab 5d)',
    estDuration: 'Ready for scheduling',
    readyForSchedule: true
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    title: 'Ultrasonic Full-Mouth Scaling',
    category: 'Hygiene',
    description: 'Subgingival curettage + plaque debridement + fluoride varnish application.',
    cost: 180.00,
    statusText: 'Routine Recall',
    estDuration: 'Post-RCT Stage'
  }
];

export const mockPeriodontalData: PeriodontalRow[] = [
  {
    toothNumber: '#2',
    fdiNumber: '17',
    distobuccal: '3mm',
    midbuccal: '2mm',
    mesiobuccal: '3mm',
    distolingual: '3mm',
    midlingual: '2mm',
    mesiolingual: '3mm',
    furcation: 'Class 0'
  },
  {
    toothNumber: '#3',
    fdiNumber: '16',
    distobuccal: '5mm*',
    midbuccal: '3mm',
    mesiobuccal: '6mm*',
    distolingual: '4mm*',
    midlingual: '3mm',
    mesiolingual: '5mm*',
    furcation: 'Grade I',
    isBleeding: true,
    hasPocket: true
  },
  {
    toothNumber: '#4',
    fdiNumber: '15',
    distobuccal: '2mm',
    midbuccal: '2mm',
    mesiobuccal: '3mm',
    distolingual: '2mm',
    midlingual: '2mm',
    mesiolingual: '2mm',
    furcation: 'Class 0'
  },
  {
    toothNumber: '#30',
    fdiNumber: '46',
    distobuccal: '3mm',
    midbuccal: '2mm',
    mesiobuccal: '4mm*',
    distolingual: '3mm',
    midlingual: '2mm',
    mesiolingual: '3mm',
    furcation: 'Class 0',
    hasPocket: true
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    senderName: 'Docplix Health Bot (Automated SMS/WA)',
    text: 'Dear Robert, your 30-day prescription for Metformin 500mg, Lisinopril 10mg is scheduled to conclude in 3 days. Would you like our pharmacy to prepare your refill?',
    timestamp: '11:32 AM',
    status: 'Read by patient 11:35 AM'
  },
  {
    id: 'msg-2',
    sender: 'patient',
    senderName: 'Robert Vance (Patient)',
    text: 'Thanks doctor, started the new medicine today. Yes please, I would like the 30-day refill delivered to my home address like last month.',
    timestamp: '11:40 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN-98T7p_FvXL5zVw7frUNLf_EmoN8pfMNe5CYCtyKoKFr29CGo8IQwO4B03VZPCS3us-Al1kDdGdXu7qIY0QWFv_xIdRm3YRUgmAMIFkhUlbaa9lS_fcKTfOZSWELDcdD4g6x0kWH6MKI_559McxUkIFJ1sdI1YwquJR8_kivvCuF5t5FuEW0MdHuzeAfAmQQQ_EP4A1jviQ7ky9f8Qbabsf9shEXXUjE2cMjeA6S9UIvPj6x_m4'
  }
];

export const initialDentalChatMessages: ChatMessage[] = [
  {
    id: 'd-msg-1',
    sender: 'bot',
    senderName: 'Docplix Dental Bot (Auto-Nudge)',
    text: 'Good morning Eleanor! 👋 Dr. Sarah Jenkins is checking in on your Tooth #26 root canal from yesterday. How is the tenderness right now on a scale of 1 to 5?',
    timestamp: '09:30 AM',
    status: 'Delivered • WhatsApp API'
  },
  {
    id: 'd-msg-2',
    sender: 'patient',
    senderName: 'Eleanor Vance',
    text: 'Mild tenderness when tapping (around a 2), but the throbbing pain is completely gone! Can I chew normal food today?',
    timestamp: '09:44 AM'
  },
  {
    id: 'd-msg-3',
    sender: 'doctor',
    senderName: 'Dr. Sarah Jenkins (You)',
    text: 'That is completely normal for 48h after the canal disinfection. Please keep chewing on the opposite side until we place your permanent crown next week!',
    timestamp: '10:02 AM',
    status: 'Read'
  }
];
