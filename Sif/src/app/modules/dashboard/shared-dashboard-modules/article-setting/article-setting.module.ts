import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleSettingComponent } from './article-setting.component';
import { ToggleSwitchModule } from 'src/app/shared-modules/toggle-switch/toggle-switch.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ToggleSwitchModule
  ],
  declarations: [ArticleSettingComponent],
  exports: [
    ArticleSettingComponent
  ]
})
export class ArticleSettingModule { }
