import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<{ data: Employee[] }>(this.apiUrl).pipe(
      map((response: any) => response.data) 
    );
  }
}
