import { Component } from '@angular/core';
import { Employee } from '../../types/types';
import { EmployeeService } from '../shared/employees.service';
import { CommonModule } from '@angular/common';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';
import { SearchEmployeesComponent } from '../search-employees/search-employees.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, SearchEmployeesComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  // initialize employees observer as behavior subject to cache http get response as api data changes randomly
  employees$ = new BehaviorSubject<Employee[]>([]);
  filteredEmployees$: Observable<Employee[]> = this.employees$.asObservable();
  isLoading = false;
  fetchEmployeesError: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.initEmployees();
  }

  initEmployees(): void {
    this.isLoading = true;
    this.employeeService
      .getEmployees()
      .pipe(
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
      )
      .subscribe((employees: Employee[]) => this.employees$.next(employees));
  }

  onSearchChange(search: string): void {
    this.filteredEmployees$ = this.employees$.pipe(
      map((employees: Employee[]) =>
        employees.filter(
          (employee: Employee) =>
            employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }
}
