import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-new-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-employee-form.component.html',
  styleUrl: './new-employee-form.component.scss',
})
export class NewEmployeeFormComponent {
  employeeForm = this.fb.group({ 
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
  });

  constructor(private fb: FormBuilder) {}

  validateDateOfBirth(control: FormControl): { [key: string]: boolean } | null {
    const dateOfBirth = new Date(control.value).getFullYear();
    const today = new Date().getFullYear();

    // check if the new employee is not younger than 18
    if (today - dateOfBirth < 18) {
      return { invalidDateOfBirth: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      console.log(newEmployee);
      this.employeeForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
