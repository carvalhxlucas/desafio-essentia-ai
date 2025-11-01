export interface CreateAppointmentRequest {
  patientId: number;
  medicalSlotId: number;
}

export interface CancelAppointmentRequest {
  appointmentId: number;
}

