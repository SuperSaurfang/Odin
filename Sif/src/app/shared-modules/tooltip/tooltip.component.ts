import { Component, Input, OnInit } from '@angular/core';

export type Position = 'left' | 'right' | 'top' | 'bottom' | 'topLeft';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input()
  public position: Position = 'bottom';

  @Input()
  public triggerElement: HTMLElement;

  public isShown = false;

  constructor() { }

  ngOnInit() {
    this.triggerElement.addEventListener('mouseover', () => {
      this.isShown = true;
    })

    this.triggerElement.addEventListener('mouseleave', () => {
      this.isShown = false;
    })
  }

}
