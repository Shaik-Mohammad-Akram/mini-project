import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthenticationGuard } from './authentication.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'dashboard',canActivate:[AuthenticationGuard],component:DashboardComponent,children:[
    {path:'home',canActivate:[AuthenticationGuard],component:HomeComponent},
    {path:'employees',canActivate:[AuthenticationGuard],component:EmployeesComponent},
    {path:'create-employee',canActivate:[AuthenticationGuard],component:CreateEmployeeComponent},
    {path:'employee-details/:id',canActivate:[AuthenticationGuard],component:EmployeeDetailsComponent}
  ]},
  {path:"**",component:ErrorComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
