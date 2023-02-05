import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input()
  public menuTitle = 'Mein Menu';

  @Input()
  public isOpen: boolean;
  
  @Output()
  public close = new EventEmitter<boolean>();

  public onClose() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

}
