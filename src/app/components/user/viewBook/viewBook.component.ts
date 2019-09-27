import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserBooks } from 'src/app/models/user-model';

@Component({
  selector: 'app-viewBook',
  templateUrl: './viewBook.component.html',
  styleUrls: ['./viewBook.component.scss']
})
export class ViewBookComponent implements OnInit {
  private selectBook:any = {};
  constructor(
    private UserService: UserService
  ) { 
    this.UserService.$book.subscribe(res => this.selectBook = res)
  }

  ngOnInit() {
  }

}
