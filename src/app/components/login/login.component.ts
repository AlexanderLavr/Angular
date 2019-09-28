import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { LoginService } from 'src/app/services/login.service';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private error: string;

  constructor(
    private LoginService: LoginService,
    private HeaderService: HeaderService,
    private router: Router
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
        (res: any)=>{
          const token = res.data;
          localStorage.setItem('token', token)
          localStorage.setItem('books', JSON.stringify([]))
          localStorage.setItem('countBooks', JSON.stringify(0))
          const decoded:any = jwt_decode(token);

          this.LoginService.getAvatar(`users/avatar/${decoded.id}`).subscribe(
            (req: any)=>this.HeaderService.getAvatar(req.data)
          )
          this.HeaderService.getToken(token)
        },
        (error: any)=>{
          this.error = error.error.error;
      })
    }
  }
  ngOnInit() {
    const token = this.HeaderService.getLocal('token');
    if(!token){
      this.router.navigateByUrl('/login')
    }
    if(token){
      const decoded: any = jwt_decode(token);
      if(decoded.isAdmin[0] === 'admin'){
        this.router.navigateByUrl('/admin')
      }
      if(decoded.isAdmin[0] === 'user'){
        this.router.navigateByUrl('/user')
      }
    }
  }
}
