import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

import { BlogRoutingModule } from './blog.routing';



@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class BlogModule {}
