import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EmployeesListComponent } from '../employees/employees-list/employees-list.component';
import { RouterLink } from '@angular/router';
import { SearchEmployeesComponent } from '../employees/search-employees/search-employees.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, EmployeesListComponent, SearchEmployeesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
