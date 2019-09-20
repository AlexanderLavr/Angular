import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { RegisterModel } from '../models/register-model';

@Injectable()
export default class RegisterService {
  providedIn: 'root'
  qwe: 'http//localhost:3200/'
  constructor(private http: HttpClient) { 
this.qwe = 'http//localhost:3200/'; 
  }

  post(url: string, body: any):Observable<RegisterModel>{
    debugger;
    return this.http.post<any>(`${this.qwe}${url}`, body)
  }


}
