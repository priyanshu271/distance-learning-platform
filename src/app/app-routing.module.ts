import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';

const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  {path:'students-data',component:StudentsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
