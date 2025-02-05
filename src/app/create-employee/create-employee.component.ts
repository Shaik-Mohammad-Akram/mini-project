import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  public employeeForm:FormGroup= new FormGroup({
    name:new FormControl(),
    company:new FormControl(),
    dob:new FormControl(),
    gender:new FormControl(),
    address:new FormGroup({
      addressline:new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      pincode:new FormControl(),
  }),
 Workmode:new FormControl(),
  cards:new FormArray([]),
});
 
get cardFormArray(){
  return this.employeeForm.get('cards') as FormArray
}
hikes(){
  this.cardFormArray.push(
    new FormGroup({
      year:new FormControl(),
      percentage:new FormControl(),
    })
  )
}
delete(i:number){
  this.cardFormArray.removeAt(i);

}
constructor(private _employeesservice:EmployeesService,private _router:Router){
  this.employeeForm.get('Workmode')?.valueChanges.subscribe(
    (data:any)=>{
      if(data == 'remote'){
        this.employeeForm.addControl('Wifi-Bill',new FormControl());
        this.employeeForm.removeControl('Transport-Fee');
      }else{
        this.employeeForm.addControl('Transport-Fee', new FormControl());
        this.employeeForm.removeControl('Wifi-Bill');
      }
    }
  );
  
}  submit(){
  console.log(this.employeeForm.value);
  this._employeesservice.createemployee(this.employeeForm.value).subscribe(
    (data:any)=>{
      alert('Employee Data Created Successfully');
      this._router.navigateByUrl('/dashboard/employees')
    },(err:any)=>{
      alert('internal server error')
    }
  )
}
}
