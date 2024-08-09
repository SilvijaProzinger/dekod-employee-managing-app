import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl =
    'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<{ data: Employee[] }>(this.apiUrl)
      .pipe(map((response: any) => response.data));
  }

  applyListOptions(
    employees: Employee[],
    searchQuery: string,
    selectedFilters: Set<string>,
    sortBy: string,
    currentPage: number,
    pageSize: number
  ): { filteredEmployees$: Observable<Employee[]>; totalItems: number } {
    const filtered = employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesJobTitle =
        selectedFilters.size === 0 || selectedFilters.has(employee.jobTitle);

      return matchesSearch && matchesJobTitle;
    });

    const totalItems = filtered.length;

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'asc') {
        return a.firstName.toLowerCase().localeCompare(b.firstName);
      } else if (sortBy === 'desc') {
        return b.firstName.toLowerCase().localeCompare(a.firstName);
      }
      return 0;
    });

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    return {
      filteredEmployees$: of(sorted.slice(start, end)),
      totalItems: totalItems,
    };
  }
}
