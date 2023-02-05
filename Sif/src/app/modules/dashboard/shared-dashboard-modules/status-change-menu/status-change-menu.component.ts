import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-status-change-menu',
  templateUrl: './status-change-menu.component.html',
  styleUrls: ['./status-change-menu.component.scss']
})
export class StatusChangeMenuComponent implements OnInit {

  constructor() { }

  @Input()
  public isOpen = true;
  @Output()
  public isOpenChange = new EventEmitter<boolean>();

  @Output()
  public updateStatus = new EventEmitter<string>();

  ngOnInit() {

  }

  public onClose(event: boolean) {
    this.isOpen = event;
    this.isOpenChange.emit(this.isOpen);
  }

}
