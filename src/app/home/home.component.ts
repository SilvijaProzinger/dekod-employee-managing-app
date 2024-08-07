import { Component } from '@angular/core';
import { EmployeesListComponent } from '../employees/employees-list/employees-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, EmployeesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
