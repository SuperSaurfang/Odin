import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }


  public iconExit = faTimes;

  @Input()
  public menuTitle = 'Mein Menu';

  @Input()
  public isOpen: boolean;
  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  ngOnInit() {
  }

  public onClose() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

}
