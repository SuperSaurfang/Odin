import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleSettingComponent } from './article-setting.component';
import { ToggleSwitchModule } from 'src/app/shared-modules/toggle-switch/toggle-switch.module';
import { CategorySettingComponent } from './category-setting/category-setting.component';
import { TagSettingComponent } from './tag-setting/tag-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ToggleSwitchModule
  ],
  declarations: [
    ArticleSettingComponent,
    CategorySettingComponent,
    TagSettingComponent
  ],
  exports: [
    ArticleSettingComponent
  ]
})
export class ArticleSettingModule { }
