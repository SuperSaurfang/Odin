import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp, faExternalLinkAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { Tag } from 'src/app/core';

@Component({
  selector: 'app-tag-result',
  templateUrl: './tag-result.component.html',
  styleUrls: ['./tag-result.component.scss']
})
export class TagResultComponent implements OnInit {
  public showResultIcon = faAngleUp;
  public tagIcon = faTag;
  public externalLinkIcon = faExternalLinkAlt;

  public showResult = true;

  @Input()
  public tagList: Tag[] = [];

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
