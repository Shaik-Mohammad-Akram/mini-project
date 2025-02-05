import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginform:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required]),
  });
constructor(private _loginservice:LoginService, private _router:Router){}
login(){
  console.log(this.loginform.value);
  this._loginservice.login(this.loginform.value).subscribe(
    (data:any)=>{
      console.log(data);
      alert('Login Successful');
      sessionStorage.setItem('token',data.token);
      this._router.navigateByUrl('/dashboard');
    },(err:any)=>{
      alert('Invalid Credentials')
    }
  )
}
}
