import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
