import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable()
export default class RegisterService {
  providedIn: 'root'
  urlApi = environment.url;
  constructor(private http : HttpClient) { }

  post(url, user):Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, user)
  }
}
