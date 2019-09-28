import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomHttpInterceptorService } from './services/interceptor';
import RegisterService from './services/register.service';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/guards/core.module';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { HeaderComponent, Modal} from 'src/app/components/header/header.component';
import { RegistrationComponent } from 'src/app/components/registeration/registeration.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AdminComponent, ModalEditUser, ModalBooks } from 'src/app/components/admin/admin.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ViewBookComponent } from 'src/app/components/user/viewBook/viewBook.component';


@NgModule({
  declarations: [ 
    AppComponent,
    MainComponent,
    HeaderComponent,
    RegistrationComponent, 
    LoginComponent,
    Modal,
    ModalEditUser,
    ModalBooks,
    AdminComponent,
    UserComponent,
    ViewBookComponent
  ], 
  entryComponents:[
    Modal,
    ModalEditUser,
    ModalBooks
  ],
  imports: [ 
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    RegisterService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
