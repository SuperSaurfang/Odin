import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core';

@Component({
  selector: 'app-category-result',
  templateUrl: './category-result.component.html',
  styleUrls: ['./category-result.component.scss']
})
export class CategoryResultComponent implements OnInit {


  @Input()
  public categoryList: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

}
