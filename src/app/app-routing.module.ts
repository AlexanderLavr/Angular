import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';

import { MainComponent } from './components/main/main.component';
import { RegistrationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { ViewBookComponent } from './components/user/viewBook/viewBook.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'regestration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: ViewBookComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
