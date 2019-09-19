import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-registerration',
  templateUrl: './registerration.component.html',
  styleUrls: ['./registerration.component.scss']
})
export class RegisterrationComponent implements OnInit{

  public registrForm: FormGroup;
  constructor() {
    this.registrForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  register(): void {
    if(this.registrForm.status === 'VALID'){
      
    }
   
  }
  
  // fetchHttp() {

  //   this.http.get<any>('https://localhost:5200/users').subscribe(data => console.log(data)
  //   )

  // }

  ngOnInit() {
    // this.registrForm.valueChanges.subscribe(val=>console.log(val))
    // this.registrForm.statusChanges.subscribe(status=>console.log(status))
  }


}
