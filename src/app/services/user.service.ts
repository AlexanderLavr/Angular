import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlApi = environment.url;
  private book = new Subject<any>();
  private eventCart = new Subject<any>();
  $book = this.book;
  $eventCart = this.eventCart;
constructor(private http: HttpClient) { }

  getAllBooks(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  selectBook(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }

  chooseBook(book:{}){
    this.book.next(book)
  }
  toCart(){
    this.eventCart.next()
  }

  searchBook(url: string): Observable<any> {
    return this.http.get(`${this.urlApi}${url}`).pipe(
        catchError(err => of(null))
    );
  }
  getMatch(selectBooksArr:any, id:string):boolean{
    let match:boolean = false;
    for(let element of selectBooksArr){
        if(id === String(element._id)){
          element.totalCount++
          localStorage.setItem('books', JSON.stringify(selectBooksArr))
          return match = true;
        }
    }
    return match
  }
  

}
