import { Component, Directive, Input, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collapsible-content-box',
  templateUrl: './collapsible-content-box.component.html',
  styleUrls: ['./collapsible-content-box.component.scss']
})
export class CollapsibleContentBoxComponent implements OnInit {

  @Input()
  set initialState(value: boolean) 
  {
    if(value) {
      this.isOpen = value;
      this.currentAngleIcon = faAngleUp;
    }
  }

  public isOpen = false;
  public currentAngleIcon = faAngleDown;
  constructor() { }

  ngOnInit() {
  }

  public onShowContent() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.currentAngleIcon = faAngleUp;
    } else {
      this.currentAngleIcon = faAngleDown;
    }
  }
}

@Directive({
  selector: 'content-box-header'
})
export class ContentBoxHeader {}

@Directive({
  selector: 'content-box-body'
})
export class ContentBoxBody {}
