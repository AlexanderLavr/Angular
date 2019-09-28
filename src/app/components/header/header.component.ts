import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

import { DialogData } from 'src/app/models/header-model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isAdmin: string;
  private email: string;
  private profile: string;
  private id: number;

  private arrayBooks = [];
  private countBooks: number = 0;

  constructor(
    private HeaderService: HeaderService,
    private UserService: UserService,
    private LoginService: LoginService,
    public dialog: MatDialog,
    private router: Router
    ) {
    this.HeaderService.$updateCart.subscribe(res => this.localStorageCart())
    this.UserService.$eventCart.subscribe(res => this.localStorageCart())
    this.HeaderService.chooseAvatar$.subscribe(img => this.profile = img)
    this.HeaderService.token$.subscribe(
      (token: any)=>{
        const decoded:any = jwt_decode(token);
        decoded.isAdmin.forEach((element: string) => {
          this.isAdmin = element;
        });  
        this.id = decoded.id
        this.email = decoded.email
        if(decoded.isAdmin[0] === 'admin'){
          this.router.navigateByUrl('/admin')
        }
        if(decoded.isAdmin[0] === 'user'){
          this.router.navigateByUrl('/user')
        }
      }
    )
    this.HeaderService.avatar$.subscribe(img => this.profile = img)
  }
  openProfileModal(): void {
    this.dialog.open(Modal, {
      width: 'auto',
      data: {profile: this.profile, id: this.id, cartModal: false}
    });
  }
  openCartModal(): void {
    this.dialog.open(Modal, {
      width: 'auto',
      data: {cartModal: true, arrayBooks: this.arrayBooks}
    });
  }
  
  logOut() {
    localStorage.clear()
    this.isAdmin = undefined;
    this.router.navigate(['login'])
  }

  localStorageCart(){
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    let countBooks = JSON.parse(localStorage.getItem('countBooks'));
    this.arrayBooks = selectBooksArr;
    this.countBooks = countBooks;
  }

  ngOnInit() {
    const token = this.HeaderService.getLocal('token');
    if(!token){
      this.router.navigateByUrl('/login')
    }
    if(token){
      const decoded: any = jwt_decode(token);
      decoded.isAdmin.forEach((element: string) => {
        this.isAdmin = element;
      });
      this.email = decoded.email;
      this.id = decoded.id
      this.LoginService.getAvatar(`users/avatar/${decoded.id}`).subscribe(
        (req: any) => this.HeaderService.getAvatar(req.data)
      )
      if(decoded.isAdmin[0] === 'admin'){
        this.router.navigateByUrl('/admin')
      }
      if(decoded.isAdmin[0] === 'user'){
        this.router.navigateByUrl('/user')
      }
    }
    this.localStorageCart()
  }

}

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
  styleUrls: ['./header.component.scss']
})
export class Modal {
  public choosePhoto: string;
  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private HeaderService: HeaderService
    ) { }
  closeAvatarModal(id: number): void{ 
    const profile = {
      imageProfile: this.choosePhoto
    }
    this.HeaderService.saveChooseImg(`users/avatar/${id}`, profile).subscribe();
    setTimeout(()=>this.dialogRef.close(),1000)
  }
  chooseImg(event: any, previousPhoto: string){
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
    Main().then((res: string) => {
      this.HeaderService.chooseImg(res) 
      let img: any  = document.getElementById('modal-photo');
      img.src = res;
      this.choosePhoto = res;
    })
  }


  buttonDelete(e: any, arr: any){
    let id:string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id ===  String(element._id)){
          let countBooks = JSON.parse(localStorage.getItem('countBooks'));
          countBooks -= element.totalCount;
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          let index = arr.indexOf(element);
          arr.splice(index, 1);
      }
    }
    localStorage.setItem('books', JSON.stringify(arr))
    this.HeaderService.updateCartModal()
  }
  buttonAdd(e: any, arr: any){
    let id:string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id === String(element._id)){
        if(element.totalCount === Number(element.amount)){
            return
        }else{
            element.totalCount++
            let countBooks = JSON.parse(localStorage.getItem('countBooks'));
            countBooks++
            localStorage.setItem('countBooks', JSON.stringify(countBooks))
            localStorage.setItem('books', JSON.stringify(arr))
            this.HeaderService.updateCartModal()
        }
      }
    }
  }
  buttonMult(e: any, arr: any){
    let id:string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id ===  String(element._id)){
        if(element.totalCount === 1){
            return
        }else{
          element.totalCount--
          let countBooks = JSON.parse(localStorage.getItem('countBooks'));
          countBooks--
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          localStorage.setItem('books', JSON.stringify(arr))
          this.HeaderService.updateCartModal()
        }
      }
    }
  }
  countTotalPrice(arr: any): number{
    let totalPrace:number = 0;
    for(let element of arr){
        totalPrace += (element.totalCount * parseInt(element.price))
    }
    return totalPrace
  }
}