import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _httpclient:HttpClient) { }
getemloyees():Observable<any>{
  return this._httpclient.get('https://6572df5d192318b7db412dfe.mockapi.io/employees')
}
deleteemployee(id:number):Observable<any>{
  return this._httpclient.delete('https://6572df5d192318b7db412dfe.mockapi.io/employees/'+id);
}
getfilteredemployees(term:string):Observable<any>{
  return this._httpclient.get('https://6572df5d192318b7db412dfe.mockapi.io/employees?filter='+term)
}
getsortedemployees(column:string,order:string):Observable<any>{
  return this._httpclient.get('https://6572df5d192318b7db412dfe.mockapi.io/employees?sortBy='+column+'&order='+order)
}
getpaginatedemployees(limit:number,page:number):Observable<any>{
  return this._httpclient.get('https://6572df5d192318b7db412dfe.mockapi.io/employees?limit='+limit+'&page='+page)
}
getemloyee(id:number):Observable<any>{
  return this._httpclient.get('https://6572df5d192318b7db412dfe.mockapi.io/employees/'+id);
}
createemployee(data:any):Observable<any>{
return this._httpclient.post('https://6572df5d192318b7db412dfe.mockapi.io/employees',data);
}
}
