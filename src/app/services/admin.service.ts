import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  urlApi = environment.url;
  private updateUsers = new Subject<any>();
  $updateUsers = this.updateUsers;
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
  update(url:string, updateUser:{}):Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, updateUser)
  }
  updateAll(array:[]){
    this.updateUsers.next(array)
  }

  getAllBooks(url:string):Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  addBook(url:string, book:{}):Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, book)
  }
}
