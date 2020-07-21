import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleSettingComponent } from './article-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [ArticleSettingComponent],
  exports: [
    ArticleSettingComponent
  ]
})
export class ArticleSettingModule { }
