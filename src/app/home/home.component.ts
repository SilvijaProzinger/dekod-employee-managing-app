import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EmployeesListComponent } from '../employees/employees-list/employees-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EmployeesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
