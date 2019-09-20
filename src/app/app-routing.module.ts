import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registerration/registerration.component';
import { LoginComponent } from './components/login/login.component';

import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'regestration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
