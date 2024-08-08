import { Component } from '@angular/core';
import { Employee } from '../../types/types';
import { EmployeeService } from '../shared/employees.service';
import { CommonModule } from '@angular/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';
import { SearchEmployeesComponent } from '../search-employees/search-employees.component';
import { FilterEmployeesComponent } from '../../filter-employees/filter-employees.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { SortEmployeesComponent } from '../../sort-employees/sort-employees.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchEmployeesComponent,
    FilterEmployeesComponent,
    PaginationComponent,
    SortEmployeesComponent,
  ],
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

  currentPage = 1;
  pageSize = 9;
  totalItems = 0;

  sortBy = '';

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
      .subscribe((employees: Employee[]) => {
        this.employees$.next(employees);
        this.totalItems = employees.length;
        this.applyListOptions();
      });
  }

  onSearch(search: string): void {
    this.searchQuery = search;
    this.currentPage = 1;
    this.applyListOptions();
  }

  onFilter(positions: Set<string>): void {
    this.selectedFilters = positions;
    this.currentPage = 1;
    this.applyListOptions();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyListOptions();
  }

  onSortChange(sortOption: string): void {
    this.sortBy = sortOption;
    this.applyListOptions();
  }

  applyListOptions(): void {
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

    const sorted = filtered.sort((a, b) => {
      if (this.sortBy === 'asc') {
        return a.firstName.toLowerCase().localeCompare(b.firstName);
      } else if (this.sortBy === 'desc') {
        return b.firstName.toLowerCase().localeCompare(a.firstName);
      }
      return 0;
    });

    this.totalItems = filtered.length;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredEmployees$ = of(sorted.slice(start, end));
  }
}
