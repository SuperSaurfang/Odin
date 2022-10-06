import { Component, Directive, Input, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const COLLAPSE = "Einklappen";
const SHOW = "Ausklappen"


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
      this.updateValuesBoxOpen();
    }
  }

  public isOpen = false;
  public currentAngleIcon = faAngleDown;
  public currentTooltip = SHOW;
  constructor() { }

  
  ngOnInit() {
  }

  public onShowContent() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.updateValuesBoxOpen();
    } else {
      this.currentAngleIcon = faAngleDown;
      this.currentTooltip = SHOW;
    }
  }

  private updateValuesBoxOpen() {
    this.currentAngleIcon = faAngleUp;
    this.currentTooltip = COLLAPSE;
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
