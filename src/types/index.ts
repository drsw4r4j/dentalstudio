export type ClinicMode = 'general' | 'dental';

export type GeneralModuleId = 'patients' | 'queue' | 'billing-pharmacy' | 'crm';

export type DentalModuleId = 
  | 'dashboard'
  | 'dental-chart' 
  | 'operatory-queue' 
  | 'dental-material-pos' 
  | 'dental-crm';

export interface VitalsData {
  bp: string;
  bpStatus?: string;
  hr: number;
  spo2: number;
  temp: string;
  bmi: number;
  rbs: number;
  recordedTime?: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  uhid: string;
  dob: string;
  phone: string;
  bloodGroup: string;
  insurancePayer: string;
  insurancePolicyId: string;
  allergies: string[];
  chronicConditions: string[];
  avatar: string;
  vitals: VitalsData;
  activeOpdRoom: string;
  chiefComplaint?: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  refills: number;
  route: string;
  isNew?: boolean;
  status: 'Active' | 'Discontinued' | 'Dispensed';
  since?: string;
}

export interface DiagnosticOrder {
  id: string;
  name: string;
  category: string;
  status: 'Routine' | 'Renal check' | 'Spot test' | 'Urgent';
  selected: boolean;
}

export interface QueueToken {
  id: string;
  tokenNumber: string;
  patientName: string;
  age: number;
  gender: string;
  uhid: string;
  phone?: string;
  arrivalTime: string;
  waitTime: string;
  triagePriority: 'Routine / Green' | 'Priority / Amber' | 'URGENT RED' | 'Routine (Prenatal)' | 'Routine (Thyroid Follow-up)';
  chiefComplaint: string;
  assignedDoctor: string;
  vitalsStatus: string;
  isCalling?: boolean;
  calledTime?: string;
  vitalsSummary?: string;
}

export interface PharmacyStockItem {
  id: string;
  medicineName: string;
  brand: string;
  salt: string;
  sig: string;
  batchNumber: string;
  expiry: string;
  rackLocation: string;
  currentStock: number;
  unit: string;
  prescribedQuantity: number;
  unitPrice: number;
  verified: boolean;
  isCriticalLow?: boolean;
  genericAlternative?: {
    name: string;
    brand: string;
    savingAmount: number;
    savingPercent: number;
  };
}

export interface DentalToothState {
  toothNumber: number; // Universal 1-32 or FDI 11-48
  fdiNumber: number;
  surfaces: {
    M: boolean; // Mesial
    O: boolean; // Occlusal / Incisal
    D: boolean; // Distal
    B: boolean; // Buccal / Facial
    L: boolean; // Lingual / Palatal
  };
  condition?: string; // e.g. 'Caries', 'Root Canal Treated', 'Crown (PFM/Zirconia)', 'Composite Restoration', 'Missing / Planned Implant'
  pocketDepth?: number;
  bleedOnProbing?: boolean;
  notes?: string;
}

export interface PeriodontalRow {
  toothNumber: string;
  fdiNumber: string;
  distobuccal: string;
  midbuccal: string;
  mesiobuccal: string;
  distolingual: string;
  midlingual: string;
  mesiolingual: string;
  furcation: string;
  isBleeding?: boolean;
  hasPocket?: boolean;
}

export interface TreatmentPhase {
  id: string;
  phaseNumber: number;
  title: string;
  category: 'Immediate' | 'Prosthetic' | 'Hygiene';
  description: string;
  cost: number;
  statusText: string;
  estDuration: string;
  readyForSchedule?: boolean;
}

export interface DentalLabOrder {
  id: string;
  patientName: string;
  patientUhid: string;
  rxNumber: string;
  labPartner: string;
  impressionType: string;
  toothTarget: string;
  materialShade: string;
  dueTime: string;
  courierDetail: string;
  status: 'Milled & In Transit' | 'Cast Poured' | 'CAD Margin Verification' | 'Received & Sterilized';
  previewImageUrl?: string;
}

export interface DentalMaterialItem {
  id: string;
  name: string;
  category: 'Implantology' | 'Biomaterials' | 'Restorative' | 'Anesthetics';
  description: string;
  stockCount: number;
  stockUnit: string;
  lotNumber: string;
  expiryDate: string;
  isCritical: boolean;
  criticalMessage?: string;
}

export interface OperatoryChair {
  id: string;
  name: string;
  operatoryCode: string;
  chairType: string;
  specialty: string;
  status: 'IN USE' | 'READY' | 'TURNOVER' | 'IDLE';
  assignedDoctor: string;
  currentPatient?: {
    name: string;
    uhid: string;
    tooth: string;
    procedureName: string;
    elapsedSeconds: number;
    estimatedMinutes: number;
  };
  turnoverDetails?: {
    action: string;
    minutesRemaining: number;
  };
  nextAppointment?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'patient' | 'doctor';
  senderName: string;
  text: string;
  timestamp: string;
  status?: string;
  avatar?: string;
}
