import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-employees.component.html',
  styleUrl: './filter-employees.component.scss',
})
export class FilterEmployeesComponent {
  @Input() employees$: Observable<Employee[]> = new Observable<Employee[]>();
  @Output() positionsOutput: EventEmitter<Set<string>> = new EventEmitter<
    Set<string>
  >();

  positionsCheckboxes: string[] = [];
  checkedPositions: Set<string> = new Set();

  ngOnInit(): void {
    this.employees$
      .pipe(
        map((employees: Employee[]) => {
          const allPositions = employees.map((employee) => employee.jobTitle);
          const positionsFiltered = allPositions.filter(
            (title, index) => allPositions.indexOf(title) === index
          );
          this.positionsCheckboxes = positionsFiltered
        })
      )
      .subscribe();
  }

  handleFilterChange(event: Event, position: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedPositions.add(position);
    } else {
      this.checkedPositions.delete(position);
    }
    this.positionsOutput.emit(this.checkedPositions);
  }
}
