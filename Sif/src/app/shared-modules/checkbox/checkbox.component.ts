import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  public checked = faCheckSquare;
  public unchecked = faSquare;
  public indeterminate = faMinusSquare;

  @Input()
  public isIndeterminate = false;

  @Input()
  public isChecked = false;

  @Input()
  public label = "";

  @Output()
  public StateChanged = new EventEmitter<boolean>();

  ngOnInit() {
  }

  public stateChanged(event: MouseEvent) {
    this.StateChanged.emit(event.target['checked']);
  }
}
