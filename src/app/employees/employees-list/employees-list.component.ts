import { Component } from '@angular/core';
import { Employee } from '../../types/types';
import { EmployeeService } from '../shared/employees.service';
import { CommonModule } from '@angular/common';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';
import { SearchEmployeesComponent } from '../search-employees/search-employees.component';
import { FilterEmployeesComponent } from '../../filter-employees/filter-employees.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, SearchEmployeesComponent, FilterEmployeesComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  // initialize employees observer as behavior subject to cache http get response as api data changes randomly
  employees$ = new BehaviorSubject<Employee[]>([]);
  filteredEmployees$: Observable<Employee[]> = this.employees$.asObservable();
  isLoading = false;
  fetchEmployeesError: string | null = null;
  searchQuery = '';
  selectedFilters: Set<string> = new Set();

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

  onSearch(search: string): void {
    this.searchQuery = search;
    this.applyListOptions();
  }

  onFilter(positions: Set<string>): void {
    this.selectedFilters = positions;
    this.applyListOptions();
  }

  applyListOptions(): void {
    console.log(this.selectedFilters)
    const filtered = this.employees$.getValue().filter((employee) => {
      const matchesSearch =
        employee.firstName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      const matchesJobTitle =
        this.selectedFilters.size === 0 ||
        this.selectedFilters.has(employee.jobTitle);

      return matchesSearch && matchesJobTitle;
    });
    this.filteredEmployees$ = of(filtered);
  }
}
