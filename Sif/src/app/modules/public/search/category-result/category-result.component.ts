import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp, faExternalLinkAlt, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/core';

@Component({
  selector: 'app-category-result',
  templateUrl: './category-result.component.html',
  styleUrls: ['./category-result.component.scss']
})
export class CategoryResultComponent implements OnInit {
  public showResultIcon = faAngleUp;
  public categoryIcon = faFolder;
  public externalLinkIcon = faExternalLinkAlt;

  public showResult = true;

  @Input()
  public categoryList: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

  public onShowResultChange() {
    this.showResult = !this.showResult;
    if (this.showResult) {
      this.showResultIcon = faAngleUp;
    } else {
      this.showResultIcon = faAngleDown;
    }
  }

}
