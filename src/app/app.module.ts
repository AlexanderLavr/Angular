import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationComponent } from './components/registerration/registerration.component';
import { LoginComponent } from './components/login/login.component';
import { CustomHttpInterceptorService } from './services/interceptor';


import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import RegisterService from '../../src/app/services/register.service'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    RegistrationComponent, 
    LoginComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    RegisterService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
