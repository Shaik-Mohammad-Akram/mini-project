import { Component } from '@angular/core';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
employees:any[]=[];
constructor(private _employeesservice:EmployeesService){
  this.pageload();
}
pageload(){
  this._employeesservice.getemloyees().subscribe(
    (data:any)=>{
      console.log(data);
      this.employees=data;
    },(err:any)=>{
      alert('internal Server error')
    }
  )
}
delete(id:number){
this._employeesservice.deleteemployee(id).subscribe(
  (data:any)=>{
    console.log(data);
    alert('Employee Data Deleted SuccessFully😍😍');
    this.pageload();
  },(err:any)=>{
    alert('Internal Server Error')
  }
)
}
term:string='';
filter(){
  this._employeesservice.getfilteredemployees(this.term).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    },(err:any)=>{
      alert('internal server error')
    }
  )
}
column:string='';
order:string='';
sort(){
  this._employeesservice.getsortedemployees(this.column,this.order).subscribe(
    (data:any)=>
    {
      this.employees=data;
      console.log(this.employees);
    },(err:any)=>{
      alert('internal server error')
    }
  )
}
limit:number=0;
page:number=0;
pagination(){
  this._employeesservice.getpaginatedemployees(this.limit,this.page).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    },(err:any)=>{
      alert('internal server error')
    }
  )
}
}
