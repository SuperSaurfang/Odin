import { Component, Input } from '@angular/core';

export type HintType = 'ok' | 'warn' | 'danger' | 'info';

@Component({
  selector: 'app-hintbox',
  templateUrl: './hintbox.component.html',
  styleUrls: ['./hintbox.component.scss']
})
export class HintboxComponent {

  @Input()
  public hintType: HintType = 'info';

  constructor() { }

}
