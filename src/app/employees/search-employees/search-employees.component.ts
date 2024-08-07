import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-employees',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-employees.component.html',
  styleUrl: './search-employees.component.scss',
})
export class SearchEmployeesComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

  handleSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue.emit(input.value.trim());
  }
}
