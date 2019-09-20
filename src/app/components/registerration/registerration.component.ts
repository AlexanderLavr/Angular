import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import RegisterService from 'src/app/services/register.service';



@Component({
  selector: 'app-registerration',
  templateUrl: './registerration.component.html',
  styleUrls: ['./registerration.component.scss']
})
export class RegistrationComponent implements OnInit{

  public registrForm: FormGroup;
  constructor(
    private RegisterService: RegisterService
  ) {
    this.registrForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  register():any{
    if(this.registrForm.status === 'VALID'){
      const register = {
        firstname: this.registrForm.get('firstname').value,
        secondname: this.registrForm.get('secondname').value,
        email: this.registrForm.get('email').value,
        password: this.registrForm.get('password').value
      }

      this.RegisterService.getUser('users/register', register).subscribe(data=>console.log(data))
    }
     
  }

  ngOnInit() {
   
  }


}
