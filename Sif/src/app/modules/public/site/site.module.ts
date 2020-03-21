import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site.routing';


@NgModule({
  declarations: [SiteComponent],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
