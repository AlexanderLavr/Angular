import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  urlApi = environment.url;
  private editUser = new Subject<any>();
  $editUser = this.editUser.asObservable();
constructor(private http: HttpClient) { }

  getAllUser(url:string):Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  deletUser(url:string):Observable<any>{  
    return this.http.delete(`${this.urlApi}${url}`)
  }
  findOne(url:string):Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  getEditUser(user:{}){
    this.editUser.next(user)
  }
}
