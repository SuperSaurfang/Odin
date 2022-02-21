import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutes } from './search.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ArticleResultComponent } from './article-result/article-result.component';
import { CategoryResultComponent } from './category-result/category-result.component';
import { TagResultComponent } from './tag-result/tag-result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    SearchRoutes
  ],
  declarations: [
    SearchComponent,
    ArticleResultComponent,
    CategoryResultComponent,
    TagResultComponent,
  ]
})
export class SearchModule { }
