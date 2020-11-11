import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit {

  constructor() { }

  public iconToggleOff = faToggleOff;
  public iconToggleOn = faToggleOn;

  @Input()
  public isToggleOn = false;

  @Input()
  public label: string = 'none'

  @Output()
  public isToggleOnChange = new EventEmitter<boolean>();

  ngOnInit() {
  }

  public toggle(event: MouseEvent) {
    this.isToggleOnChange.emit(event.target['checked']);
  }
}
