
export enum Tab {
  HOME = 'HOME',
  RECORDS = 'RECORDS',
  PASS = 'PASS', // Changed from HOSPITALS to PASS (Digital Ticket)
  PLAN = 'PLAN',
  PROFILE = 'PROFILE',
  // Doctor Tabs
  WORKBENCH = 'WORKBENCH',
  SCANNER = 'SCANNER',
  DOCTOR_PROFILE = 'DOCTOR_PROFILE',
  // Family Tabs
  FAMILY_HOME = 'FAMILY_HOME',
  FAMILY_PROFILE = 'FAMILY_PROFILE'
}

export type LoginType = 'SHANGHAI' | 'NON_SHANGHAI';
export type AuthMethod = 'MEDICARE' | 'WECHAT' | 'ALIPAY' | 'ID_CARD' | 'WORK_ID';
export type UserRole = 'PATIENT' | 'FAMILY' | 'DOCTOR';
export type DoctorType = 'COMMUNITY' | 'SPECIALIST'; // NEW: Distinguish doctor roles

// Login Flow States based on the chart
export type LoginStep = 'SPLASH' | 'LOGIN_FORM' | 'PROCESSING' | 'REGION_WARNING' | 'COMPLETED';

// NEW: User Journey Steps for the Demo Flow
export type JourneyStep = 
  | 'ONBOARDING'         // 1. New user, needs to bind record
  | 'HOME_DEFAULT'       // 2. Fresh home, no tasks, just grid
  | 'CHECKUP_BOOKED'     // 3. User booked initial checkup
  | 'PAYMENT_PENDING'    // 4. Checkup done, needs payment
  | 'ANALYZING'          // 5. Paid, waiting for 3A hospital result
  | 'REPORT_READY'       // 6. Report arrived (Joint Diagnosis)
  | 'TREATMENT_ACTIVE';  // 7. Plan accepted, regular injection reminders (Original Demo State)

export interface AuthState {
  isLoggedIn: boolean;
  userType: LoginType;
  role: UserRole; 
  authMethod?: AuthMethod;
  isVisitor?: boolean; 
  doctorType?: DoctorType; // NEW
}

export interface Reminder {
  id: string;
  type: 'MEDICATION' | 'APPOINTMENT' | 'TREATMENT';
  title: string;
  time: string;
  detail: string;
  status: 'PENDING' | 'BOOKED' | 'COMPLETED';
  actionLabel?: string;
  location?: string;
}

export interface MedicalRecord {
  id: string;
  diagnosis: string;
  diagnosisDate: string;
  hospitalName: string; // Originating Grade 3A hospital
  doctorName: string;
  prescription: string[];
  treatmentPlan: string;
  status: 'ACTIVE' | 'ARCHIVED';
  transferStatus?: 'NONE' | 'PENDING' | 'COMPLETED';
}

export interface Hospital {
  id: string;
  name: string;
  type: 'COMMUNITY' | 'GRADE_3A';
  distance: string; 
  address: string;
  tags: string[]; 
  rating: number;
  availableServices: string[];
  waitingTime: string;
  isRecommended?: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  linkedFamilyMembers: string[];
  medicareBalance: string;
  idCardLast4?: string;
  avatar?: string;
}

export interface DoctorTask {
  id: string;
  type: 'APPOINTMENT' | 'TRANSFER_REVIEW' | 'MESSAGE' | 'CONSULTATION'; // Added CONSULTATION
  patientName: string;
  description: string;
  time: string;
  urgent: boolean;
  status: 'PENDING' | 'DONE';
}

export interface Appointment {
  id: string;
  hospitalName: string;
  department: string;
  floor: string;
  room: string;
  date: string;
  timeSlot: string;
  project: string;
  status: string;
  queueNumber: string;
}

// --- NEW TYPES FOR ENRICHMENT ---

export interface LabResult {
  name: string;
  value: string;
  unit: string;
  range: string;
  status: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL';
}

export interface MedicalImage {
  id: string;
  type: 'CT' | 'X-RAY' | 'MRI' | 'ULTRASOUND';
  url: string; // Use placeholder or color block
  date: string;
  description: string;
}

export interface QueuePatient {
  id: string;
  name: string;
  age: number;
  gender: '男' | '女';
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  waitTime: string;
  type: string;
  chiefComplaint: string; // e.g., "Left arm numbness"
  allergies: string[];
  lastVisit: string;
  avatarColor: string;
  // For specialist view
  diagnosisPending?: boolean;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  communityHospital?: string;
  uploadedData?: {
    bloodSugar: string;
    symptoms: string[];
    preliminaryCheck: string;
    labResults?: LabResult[];
    images?: MedicalImage[];
    historyTrend?: number[]; // Simple array for sparkline
  }
}

export interface VitalSign {
  type: 'SUGAR' | 'PRESSURE' | 'HEART_RATE';
  value: string;
  unit: string;
  status: 'NORMAL' | 'HIGH' | 'LOW';
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastMeasured: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readCount: number;
  imageUrl?: string; // We'll use color blocks/icons for demo
}
