import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserBooks } from 'src/app/models/user-model';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private arrayBooks: UserBooks[] = [];
  private downloadArrayBook: boolean = false;
  private searchForm: FormGroup;
  private booksNotFound: boolean = false;

  constructor(
    public UserService: UserService,
  ) { 
    this.searchForm = new FormGroup({
      serchBook: new FormControl('')
    });

    this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    switchMap((title) => { 
      if(title.serchBook === ''){
        return this.UserService.getAllBooks('books')
      }
      return this.UserService.searchBook(`books/search/${title.serchBook}`)
    })
    ).subscribe(res =>{ 
      this.arrayBooks = res.data;
    });
  }
  viewBook(e: any){
    let id: string = e.currentTarget.id.substring(2, );
    this.UserService.selectBook(`books/takeEditBook/${id}`).subscribe(
      res => this.UserService.chooseBook(res.data)
    )
  }
  inCart(e: any){
    let id: string = e.currentTarget.id.substring(2, );
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    let countBooks = JSON.parse(localStorage.getItem('countBooks'));
    
    if(!this.UserService.getMatch(selectBooksArr, id)){
      this.UserService.selectBook(`books/takeEditBook/${id}`).subscribe(
        res => {
          let data = res.data;
          data.totalCount = 1;
          selectBooksArr.push(data)
          localStorage.setItem('books', JSON.stringify(selectBooksArr))
          countBooks++
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          this.UserService.toCart()
        }
      )
    }else{
      countBooks++
      localStorage.setItem('countBooks', JSON.stringify(countBooks))
      this.UserService.toCart()
    }
  }
  
  ngOnInit() {
    this.UserService.getAllBooks('books').subscribe(res => {
      this.arrayBooks = res.data;
      this.downloadArrayBook = res.success;
    })
  }
  
}
