import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import  { AdminService } from 'src/app/services/admin.service';
import { UsersArray, EditBook, BooksArray, DataModalBooks } from 'src/app/models/admin-model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/header-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private arrayUser: UsersArray[] = [];
  private displayedColumns: string[] = ['id', 'firstname', 'secondname', 'email', 'edit', 'delete'];
​  private dataSource: any;

  private arrayBooks: BooksArray[] = [];
  private displayedColumnsBooks: string[] = ['id', 'title', 'price', 'amount', 'edit', 'delete'];
​  private dataSourceBook: any;
  public allPages: number;
  public currentPage: number = 0;

  constructor(private AdminService: AdminService,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    ) {
    this.getAllUsers()
    this.getAllBooks()
    this.AdminService.$updateAllTables.subscribe(res=>this.dataSource = res)
    this.AdminService.$updateAllTables.subscribe(res=>{
      this.getAllBooks()
    })
   }

  editUser(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.findOne(`users/${id}`).subscribe(
      (res: any)=>{
        this.openModalEditUser(res.data)
      }
    )
  }
  deleteUser(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.deletUser(`users/${id}`).subscribe(
      res => this.getAllUsers()
    )
  }
  getAllUsers(){
    this.AdminService.getAllUser('users').subscribe(res => {
      this.arrayUser = res.data;
      this.dataSource = this.arrayUser;
    })
  }
  openModalEditUser(editUser: {}): void{
    this.dialog.open(ModalEditUser, {
      width: 'auto',
      data: editUser
    });
  }
  openModalBook(): void{
    this.dialog2.open(ModalBooks, {
      width: 'auto',
      data: {title: 'Add Book'}
    });
  }
  openModalEditBook(e: any): void{
    let id: string = e.currentTarget.id.substring(2, );
    this.AdminService.selectBook(`books/takeEditBook/${id}`).subscribe(res => {
      this.dialog2.open(ModalBooks, {
        width: 'auto',
        data: {
          title: 'Edit Book', 
          editBook: true,
          data: res
        }
      });
    })
  }

  getAllBooks(){
    this.currentPage = 0;
    this.AdminService.getAllBooks(`books/${0}`).subscribe(res =>{
      this.updateBooksTable(res)})
  }
  updateBooksTable(res){
    this.allPages = res.allPages;
    this.arrayBooks = res.data;
    this.dataSourceBook = this.arrayBooks;
    this.dataSourceBook = new MatTableDataSource<any>(this.arrayBooks);
  }
  nextPage(){
    if(this.currentPage === this.allPages - 1){
      return
    }
    this.currentPage++
    this.AdminService.getAllBooks(`books/${this.currentPage}`).subscribe(res=>this.updateBooksTable(res))
  }
  previousPage(){
    if(this.currentPage === 0){
      return
    }
    this.currentPage--
    this.AdminService.getAllBooks(`books/${this.currentPage}`).subscribe(res=>{this.updateBooksTable(res)})
  }
  sort(e: any){
    let nameOfColumn: string = e.currentTarget.id;
    let currentPage = this.currentPage;
    this.AdminService.sortBooks(`books/sort/${nameOfColumn}/${currentPage}`).subscribe(
      res => this.updateBooksTable(res)  
    )
  }
  deleteBook(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.deleteBook(`books/${id}`).subscribe(res=>this.getAllBooks())
  }
  ngOnInit() {
  }
}
   


@Component({
  selector: 'ModalEditUser',
  templateUrl: 'modal_edit_user.html',
  styleUrls: ['./admin.component.scss']
})
export class ModalEditUser {
  public editUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalEditUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public AdminService: AdminService,
    ) {
      this.editUserForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.email, Validators.required]),
      })
      this.editUserForm.patchValue({
        firstname: data.firstname,
        secondname: data.secondname,
        email: data.email 
      })
    }
    closeEditUsers(e: any): void{ 
    if(this.editUserForm.status === 'VALID'){
      let id: string = e.currentTarget.id.substring(2, );
      let updateUser:{} = this.editUserForm.value;
      this.AdminService.update(`users/${id}`, updateUser).subscribe(
        res=>{
          this.AdminService.getAllUser('users').subscribe(res =>{
            this.AdminService.updateAll(res.data)
          })
        }
      )
      setTimeout(()=>this.dialogRef.close(), 500)
    }
  }
}



@Component({
  selector: 'ModalBooks',
  templateUrl: 'modal_books.html',
  styleUrls: ['./admin.component.scss']
})
export class ModalBooks {
  public bookForm: FormGroup;
  public imgBook: string;
  private editBook: EditBook;
  constructor(
    public dialogRef: MatDialogRef<ModalBooks>,
    @Inject(MAT_DIALOG_DATA) public data: DataModalBooks,
    public AdminService: AdminService,
    ) {
      this.bookForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        choosePhoto: new FormControl('', [Validators.required]),
      })  
      if(this.data.editBook){ 
        this.editBook = this.data.data.data;
        this.imgBook = this.editBook.choosePhoto;
        this.bookForm.patchValue({
          title: this.editBook.title,
          price: this.editBook.price,
          amount: this.editBook.amount,
          description: this.editBook.description,
          choosePhoto: this.editBook.choosePhoto
        })
      }
    }
    selectPhoto(event: any){
      const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function Main(){
        const file: any = event.target.files[0];
        if(!file){
            alert('Файл не выбран!')
        }
        return await toBase64(file)
    }
    Main().then((res: string) =>{
      this.imgBook = res;
      this.bookForm.patchValue({
        choosePhoto: res
      })
    })
    }
    closeAddBooks(): void{ 
      if(this.bookForm.status === 'VALID'){
        let bookObject:{} = this.bookForm.value;
        this.AdminService.addBook('books', bookObject).subscribe(
          res=>{
            this.AdminService.updateAll([])
          }
        )
        setTimeout(()=>this.dialogRef.close(), 500)
      }
    }
    closeEditBook(): void{ 
      if(this.bookForm.status === 'VALID'){
        let bookObject: {} = this.bookForm.value;
        let id: number = this.editBook._id;
        this.AdminService.updatBook(`books/${id}`, bookObject).subscribe(
          res => this.AdminService.updateAll([])
        )
        setTimeout(()=>this.dialogRef.close(), 500)
      }
    }
}