import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  employee:any=[];
constructor(private _activatedRoute:ActivatedRoute , private _employeesservice:EmployeesService){
  _activatedRoute.params.subscribe(
    (data:any)=>{
      console.log(data.id);
      _employeesservice.getemloyee(data.id).subscribe(
        (data:any)=>{
          this.employee=data;
          console.log(data);
        },(err:any)=>{
          alert('internal server error')
        }
      )
    }
  )
}
}
