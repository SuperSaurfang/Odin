import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit, OnChanges {

  constructor() { }
  
  public currentIcon = faToggleOff.iconName;

  @Input()
  public isToggleOn = false;

  @Input()
  public label: string = 'none'

  @Output()
  public isToggleOnChange = new EventEmitter<boolean>();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isToggleOn) {
      this.currentIcon = faToggleOn.iconName;
    }
  }

  public toggle(event: MouseEvent) {
    const value = event.target['checked']
    if(value) {
      this.currentIcon = faToggleOn.iconName;
    } else {
      this.currentIcon = faToggleOff.iconName;
    }

    this.isToggleOnChange.emit(event.target['checked']);
  }
}
