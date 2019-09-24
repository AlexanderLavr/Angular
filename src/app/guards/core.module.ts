import { AuthGuard } from './auth.guards';
import { NgModule } from '@angular/core';

@NgModule({
    providers:[AuthGuard]
})
export class CoreModule { }