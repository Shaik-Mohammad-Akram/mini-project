import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock Router
class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('LoginComponent', () => {
  let service: LoginService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule], // Ensure HttpClientTestingModule is here
      providers: [
        { provide: LoginService, useValue: spy }, // Provide the mocked service
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    component.loginform.controls['email'].setValue('');
    component.loginform.controls['password'].setValue('');
    expect(component.loginform.valid).toBeFalsy();
  });

  it('should call login service and navigate to dashboard on successful login', () => {
    spyOn(window, 'alert');
    const mockResponse = { token: 'dummy-token' };

    loginServiceSpy.login.and.returnValue(of(mockResponse)); // Mocking successful login response
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.loginform.controls['email'].setValue('test@example.com');
    component.loginform.controls['password'].setValue('password123');

    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(window.alert).toHaveBeenCalledWith('Login Successful'); // Fixing typo in alert message
    expect(sessionStorage.getItem('token')).toEqual('dummy-token');
    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
  });

  it('should show an error alert on login failure', () => {
    spyOn(window, 'alert');
    loginServiceSpy.login.and.returnValue(throwError(() => new Error('Invalid Credentials'))); // Mocking failure

    component.loginform.controls['email'].setValue('wrong@example.com');
    component.loginform.controls['password'].setValue('wrongpass');

    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid Credentials'); // Fixing typo in error message
  });
});
