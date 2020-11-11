import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { faCircle, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status-change-menu',
  templateUrl: './status-change-menu.component.html',
  styleUrls: ['./status-change-menu.component.scss']
})
export class StatusChangeMenuComponent implements OnInit {

  constructor() { }


  public iconStatus = faCircle;
  public iconTrash = faTrash;

  @Input()
  public isOpen = true;
  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  @Output()
  public updateStatus = new EventEmitter<string>();

  ngOnInit() {

  }

  public onIsOpenUpdate(event: boolean) {
    this.isOpen = event;
    this.isOpenChange.emit(this.isOpen);
  }

}
