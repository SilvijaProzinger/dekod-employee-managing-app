import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortEmployeesComponent } from './sort-employees.component';

describe('SortEmployeesComponent', () => {
  let component: SortEmployeesComponent;
  let fixture: ComponentFixture<SortEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
