import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-employees.component.html',
  styleUrl: './sort-employees.component.scss',
})
export class SortEmployeesComponent {
  @Output() sortOptionOutput: EventEmitter<string> = new EventEmitter<string>();

  handleSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.sortOptionOutput.emit(selectedValue);
  }
}
