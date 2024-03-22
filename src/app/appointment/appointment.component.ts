import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule, FullCalendarModule, MatButtonModule,MatDatepickerModule,FormsModule,ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {
  constructor(public dialog: MatDialog) {}

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridWeek,dayGridDay,dayGridMonth' // user can switch between the two
    },
    weekends: false,
    editable: true,
    events: [],
    contentHeight: 600,
  };

  openAppointmentForm() {
    const dialogRef = this.dialog.open(AppointmentFormComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const updatedEvents = [...this.calendarOptions.events, result]; // Add new event to existing events
        this.calendarOptions = { ...this.calendarOptions, events: updatedEvents };
      }
    });
  }
}
