import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { EmployeesService } from '../employees.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let mockService: jasmine.SpyObj<EmployeesService>;

  beforeEach(async () => {
    const employeesServiceSpy = jasmine.createSpyObj('EmployeesService', [
      'getemloyees',
      'deleteemployee',
      'getfilteredemployees',
      'getsortedemployees',
      'getpaginatedemployees'
    ]);
    employeesServiceSpy.getemloyees.and.returnValue(of([])); 
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [EmployeesComponent],
      providers: [{ provide: EmployeesService, useValue: employeesServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger ngOnInit if exists
  mockService = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on initialization', () => {
    const mockEmployees = [{ id: 1, name: 'John Doe', company: 'ABC Corp' }];
    mockService.getemloyees.and.returnValue(of(mockEmployees));

    component.pageload();

    expect(mockService.getemloyees).toHaveBeenCalled();
    expect(component.employees).toEqual(mockEmployees);
  });

  it('should handle error while loading employees', () => {
    spyOn(window, 'alert');
    mockService.getemloyees.and.returnValue(throwError(() => new Error('Internal Server Error')));

    component.pageload();

    expect(mockService.getemloyees).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('internal Server error');
  });

  it('should delete an employee', () => {
    spyOn(window, 'alert');
    mockService.deleteemployee.and.returnValue(of({ success: true }));
    spyOn(component, 'pageload');

    component.delete(1);

    expect(mockService.deleteemployee).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Employee Data Deleted SuccessFully😍😍');
    expect(component.pageload).toHaveBeenCalled();
  });

  it('should handle error while deleting employee', () => {
    spyOn(window, 'alert');
    mockService.deleteemployee.and.returnValue(throwError(() => new Error('Internal Server Error')));

    component.delete(1);

    expect(mockService.deleteemployee).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Internal Server Error');
  });

  it('should filter employees', () => {
    const filteredEmployees = [{ id: 2, name: 'Jane Doe', company: 'XYZ Ltd' }];
    mockService.getfilteredemployees.and.returnValue(of(filteredEmployees));

    component.term = 'Jane';
    component.filter();

    expect(mockService.getfilteredemployees).toHaveBeenCalledWith('Jane');
    expect(component.employees).toEqual(filteredEmployees);
  });

  it('should handle error while filtering employees', () => {
    spyOn(window, 'alert');
    mockService.getfilteredemployees.and.returnValue(throwError(() => new Error('Internal Server Error')));

    component.filter();

    expect(mockService.getfilteredemployees).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('internal server error');
  });

  it('should sort employees', () => {
    const sortedEmployees = [{ id: 1, name: 'John Doe' }];
    mockService.getsortedemployees.and.returnValue(of(sortedEmployees));

    component.column = 'name';
    component.order = 'asc';
    component.sort();

    expect(mockService.getsortedemployees).toHaveBeenCalledWith('name', 'asc');
    expect(component.employees).toEqual(sortedEmployees);
  });

  it('should handle error while sorting employees', () => {
    spyOn(window, 'alert');
    mockService.getsortedemployees.and.returnValue(throwError(() => new Error('Internal Server Error')));

    component.sort();

    expect(mockService.getsortedemployees).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('internal server error');
  });

  it('should paginate employees', () => {
    const paginatedEmployees = [{ id: 1, name: 'John Doe' }];
    mockService.getpaginatedemployees.and.returnValue(of(paginatedEmployees));

    component.limit = 10;
    component.page = 1;
    component.pagination();

    expect(mockService.getpaginatedemployees).toHaveBeenCalledWith(10, 1);
    expect(component.employees).toEqual(paginatedEmployees);
  });

  it('should handle error while paginating employees', () => {
    spyOn(window, 'alert');
    mockService.getpaginatedemployees.and.returnValue(throwError(() => new Error('Internal Server Error')));

    component.pagination();

    expect(mockService.getpaginatedemployees).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('internal server error');
  });
});
