import { Component, Input, OnInit } from '@angular/core';
import { faExternalLinkAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { Tag } from 'src/app/core';

@Component({
  selector: 'app-tag-result',
  templateUrl: './tag-result.component.html',
  styleUrls: ['./tag-result.component.scss']
})
export class TagResultComponent implements OnInit {
  public tagIcon = faTag;
  public externalLinkIcon = faExternalLinkAlt;


  @Input()
  public tagList: Tag[] = [];

  constructor() { }

  ngOnInit() {
  }

}
