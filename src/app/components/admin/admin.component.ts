import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import  { AdminService } from 'src/app/services/admin.service';
import { UserArray } from 'src/app/models/admin-model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/header-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private arrayUser: UserArray[] = [];
  private displayedColumns: string[] = ['id', 'firstname', 'secondname', 'email', 'edit', 'delete'];
​  private dataSource: any;

  private arrayBooks: any = [];
  private displayedColumnsBooks: string[] = ['id', 'title', 'price', 'amount', 'edit', 'delete'];
​  private dataSourceBook: any;


  constructor(private AdminService: AdminService,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    ) {
    this.getAllUsers()
    this.getAllBooks()
    this.AdminService.$updateUsers.subscribe(res=>this.dataSource = res)
   }

  editUser(e:any){
    let id:string = e.currentTarget.id.substring(2, )
    this.AdminService.findOne(`users/${id}`).subscribe(
      (res:any)=>{
        this.openModalEditUser(res.data)
      }
    )
  }
  deleteUser(e:any){
    let id:string = e.currentTarget.id.substring(2, )
    this.AdminService.deletUser(`users/${id}`).subscribe(
      (res:any)=>{
        this.getAllUsers()
      }
    )
  }
  getAllUsers(){
    this.AdminService.getAllUser('users').subscribe(res =>{
      this.arrayUser = res.data;
      this.dataSource = this.arrayUser;
    })
  }
  getAllBooks(){
    this.AdminService.getAllBooks('books').subscribe(res =>{
      this.arrayBooks = res;
      this.dataSourceBook = this.arrayBooks;
      this.dataSourceBook = new MatTableDataSource<any>(this.arrayBooks);
      this.dataSourceBook.paginator = this.paginator;
    })
  }
  openModalEditUser(editUser:{}): void {
    const dialogRef = this.dialog.open(ModalEditUser, {
      width: 'auto',
      data: editUser
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openModalBook(): void {
    const dialogRef = this.dialog2.open(ModalBooks, {
      width: 'auto',
      // data: editUser
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }



  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  editBook(e:any){
    let id:string = e.currentTarget.id.substring(2, )
    console.log(id);
    
  }
  deleteBook(e:any){
    let id:string = e.currentTarget.id.substring(2, )
    console.log(id);
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
    
    closeEditUsers(e:any): void { 
    if(this.editUserForm.status === 'VALID'){
      let id:string = e.currentTarget.id.substring(2, );
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
  ngOnInit(){
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
  constructor(
    public dialogRef: MatDialogRef<ModalBooks>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public AdminService: AdminService,
    ) {
      this.bookForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        choosePhoto: new FormControl('', [Validators.required]),
      })
      // this.editUserForm.patchValue({
      //   firstname: data.firstname,
      //   secondname: data.secondname,
      //   email: data.email 
      // })
    }
    selectPhoto(event:any){
      const toBase64 = (file:any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function Main(){
        const file:any = event.target.files[0];
        if(!file){
            alert('Файл не выбран!')
        }
        return await toBase64(file)
    }
    Main().then((res:string) =>{
      this.imgBook = res;
      this.bookForm.patchValue({
        choosePhoto: res
      })
    })
    }
    closeBooks(e:any): void { 
    if(this.bookForm.status === 'VALID'){
      let bookObject:{} = this.bookForm.value;
      this.AdminService.addBook('books', bookObject).subscribe(
        res=>{
          this.AdminService.getAllBooks
        }
      )
      // let id:string = e.currentTarget.id.substring(2, );
      // let updateUser:{} = this.editUserForm.value;
      // this.AdminService.update(`users/${id}`, updateUser).subscribe(
      //   res=>{
      //     this.AdminService.getAllUser('users').subscribe(res =>{
      //       this.AdminService.updateAll(res.data)
      //     })
      //   }
      // )
      setTimeout(()=>this.dialogRef.close(), 500)
    }
  }
  ngOnInit(){
  }
}