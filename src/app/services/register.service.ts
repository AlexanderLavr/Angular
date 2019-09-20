import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable()
export default class RegisterService {
  providedIn: 'root'
constructor(private _http : HttpClient) { }

getUser(localUrl,user):Observable<any>{
  debugger;
  return this._http.post(`${environment.urlApi}${ localUrl }`, user)

  }
}
