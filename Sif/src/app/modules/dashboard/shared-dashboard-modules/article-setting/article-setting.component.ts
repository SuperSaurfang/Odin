import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faAngleUp, faAngleDown, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-setting',
  templateUrl: './article-setting.component.html',
  styleUrls: ['./article-setting.component.scss']
})
export class ArticleSettingComponent implements OnInit, OnChanges {

  constructor() { }

  public isSettingOpen = true;
  public iconStatus = faAngleUp;
  public iconCircle = faCircle;

  @Input()
  public type: string;

  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public setting: any;

  @Output()
  public settingChange = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'date') {
      const temp = new Date(this.setting);
      const month = temp.getMonth() + 1;
      const date = temp.getDate();
      let monthString = `${month}`;
      let dateString = `${date}`;
      if (month < 10) {
        monthString = `0${month}`;
      }
      if (date < 10) {
        dateString = `0${date}`;
      }
      this.setting = `${temp.getFullYear()}-${monthString}-${dateString}`;
    }
  }

  ngOnInit() {
  }

  public openStatusSettings() {
    this.isSettingOpen = !this.isSettingOpen;
    if (this.isSettingOpen) {
      this.iconStatus = faAngleUp;
    } else {
      this.iconStatus = faAngleDown;
    }
  }

}
