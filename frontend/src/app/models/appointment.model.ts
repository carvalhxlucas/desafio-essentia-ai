export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface MedicalSlot {
  id: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Appointment {
  id: number;
  status: 'confirmed' | 'cancelled';
  patientId: number;
  medicalSlotId: number;
  patient?: Patient;
  medicalSlot?: MedicalSlot;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

