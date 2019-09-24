import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface LoginData{
  email: string;
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi = environment.url;
  private loginData = new Subject<LoginData>();
  register$ = this.loginData.asObservable();  
  constructor(private http: HttpClient) { }
 
  setloginState(loginData:LoginData){
    this.loginData.next(loginData)
  }

  post(url, auth):Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, auth)
  }

  getAvatar(url):Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
}
