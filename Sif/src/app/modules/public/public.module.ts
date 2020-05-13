import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';

import { PublicRoutingModule } from './public.routing';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './header/nav/nav.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class PublicModule { }
