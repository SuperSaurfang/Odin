import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faExclamationCircle, faExclamationTriangle, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hintbox',
  templateUrl: './hintbox.component.html',
  styleUrls: ['./hintbox.component.scss']
})
export class HintboxComponent implements OnInit {
  public okIcon = faCheck;
  public warnIcon = faExclamationTriangle;
  public errorIcon = faExclamationCircle;
  public infoIcon = faInfo;

  @Input()
  public hintType: 'ok' | 'warn' | 'danger' | 'info' = 'info';

  constructor() { }

  ngOnInit() {
  }

}
