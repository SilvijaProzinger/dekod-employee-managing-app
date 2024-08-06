import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEmployeeFormComponent } from './employees/new-employee-form/new-employee-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addNewEmployee', component: NewEmployeeFormComponent },
];
