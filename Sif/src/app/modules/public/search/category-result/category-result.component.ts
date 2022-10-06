import { Component, Input, OnInit } from '@angular/core';
import { faExternalLinkAlt, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/core';

@Component({
  selector: 'app-category-result',
  templateUrl: './category-result.component.html',
  styleUrls: ['./category-result.component.scss']
})
export class CategoryResultComponent implements OnInit {
  public categoryIcon = faFolder;
  public externalLinkIcon = faExternalLinkAlt;


  @Input()
  public categoryList: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

}
