import { Component } from '@angular/core';
import { Employee } from '../../types/types';
import { EmployeeService } from '../shared/employees.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  employees$: Observable<Employee[]> = of([]);
  isLoading = false;
  fetchEmployeesError: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.initEmployees();
  }

  initEmployees(): void {
    this.isLoading = true;
    this.employees$ = this.employeeService.getEmployees().pipe(
      startWith([]),
      catchError((error: Error) => {
        console.log(error);
        this.fetchEmployeesError =
          'There has been an error while getting the employees data. Please try again.';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
