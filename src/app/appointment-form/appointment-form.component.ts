import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { EventInput } from '@fullcalendar/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule,ReactiveFormsModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './appointment-form.component.html',
  providers: [provideNativeDateAdapter()],
  // styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      title: '',
      date: ''
    });
  }

  onSubmit() {
    const newEvent: EventInput = {
      title: this.appointmentForm.value.title,
      start: this.appointmentForm.value.date
    };

    this.dialogRef.close(newEvent); // Return newEvent to the parent component
  }
}
