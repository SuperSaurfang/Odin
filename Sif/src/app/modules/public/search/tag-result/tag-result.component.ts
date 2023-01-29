import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/core';

@Component({
  selector: 'app-tag-result',
  templateUrl: './tag-result.component.html',
  styleUrls: ['./tag-result.component.scss']
})
export class TagResultComponent implements OnInit {

  @Input()
  public tagList: Tag[] = [];

  constructor() { }

  ngOnInit() {
  }

}
