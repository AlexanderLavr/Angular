import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HeaderService } from '../../services/header.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private error:string;

  constructor(
    private LoginService:LoginService,
    private HeaderService: HeaderService
    ){ 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })

    this.LoginService.register$.subscribe((data :any)=> {
      this.loginForm.patchValue({
        email: data.email,
        password: data.password
      })
    })
  }


  authentication(){
    if(this.loginForm.status === 'VALID'){
      const userLogin = {
        username: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
      this.LoginService.post('login', userLogin).subscribe(
        (res:any)=>{
          const token = res.data;
          localStorage.setItem('token', token)
          const decoded:any = jwt_decode(token);

          this.LoginService.getAvatar(`users/avatar/${decoded.id}`).subscribe(
            (req:any)=>this.HeaderService.getAvatar(req.data)
          )
          this.HeaderService.getToken(token)
        },
        (error:any)=>{
          this.error = error.error.error;
        })

      

    }
  }
  ngOnInit() {
  }

}
