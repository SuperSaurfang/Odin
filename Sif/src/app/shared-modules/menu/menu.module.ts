import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuContentDirective } from './directives/menu-content.directive';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [	
    MenuComponent,
    MenuContentDirective
   ],
  exports: [
    MenuComponent,
    MenuContentDirective
  ]
})
export class MenuModule { }
