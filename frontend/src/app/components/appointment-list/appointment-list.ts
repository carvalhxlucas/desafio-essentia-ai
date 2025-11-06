import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCardComponent } from '../appointment-card/appointment-card';
import { AppointmentService } from '../../services/appointment';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AppointmentCardComponent],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error: string | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erro ao carregar agendamentos';
        this.loading = false;
      }
    });
  }

  get confirmedAppointments(): Appointment[] {
    return this.appointments.filter(apt => apt.status === 'confirmed');
  }

  get cancelledAppointments(): Appointment[] {
    return this.appointments.filter(apt => apt.status === 'cancelled');
  }
}
