import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor() { }

  @Input()
  public menuTitle = 'Mein Menu';

  @Input()
  public isOpen: boolean;
  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  public onClose() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

}
