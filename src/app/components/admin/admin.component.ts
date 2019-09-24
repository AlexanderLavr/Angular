import { Component, OnInit, Inject } from '@angular/core';
import  { AdminService } from 'src/app/services/admin.service';
import { UserArray } from 'src/app/models/admin-model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'src/app/models/header-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private arrayUser: UserArray[] = [];
  private displayedColumns: string[] = ['id', 'firstname', 'secondname', 'email', 'edit', 'delete'];
​  private dataSource: UserArray[];
  private dataUser: boolean = false;
 
  constructor(private AdminService: AdminService,
    public dialog: MatDialog) {
    this.getAllUsers()
   }

  editUser(e:any){
    let id:string = e.currentTarget.id.substring(2, )
    this.AdminService.findOne(`users/${id}`).subscribe(
      (res:any)=>{
        this.AdminService.getEditUser(res.data)
        setTimeout(()=>{this.openDialog(res.data)}, 500)
        // console.log(res);  
        // this.openDialog(res.data)
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
      this.dataUser = true;
      this.dataSource = this.arrayUser;
    })
  }

  openDialog(editUser:{}): void {
    const dialogRef = this.dialog.open(ModalEditUser, {
      width: 'auto',
      data: editUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(){
   
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
    public AdminService: AdminService
    ) {
      

      
      
    }

  onNoClick(): void { 
    console.log(this.editUserForm.value);
    
    // this.HeaderService.saveChooseImg(`users/avatar/${id}`, profile).subscribe();
    // setTimeout(()=>this.dialogRef.close(),1000)
  }
  ngOnInit(){
    this.editUserForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
    })
    this.AdminService.$editUser.subscribe(res=>{
      this.editUserForm.patchValue({
        firstname: res.firstname,
        secondname: res.secondname,
        email: res.email 
      })
    })
  }
  

}