import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';

type SettingType = 'status' | 'allowComments' | 'showDateAuthor' | 'createDate' | 'category' | 'tag';

@Component({
  selector: 'app-article-setting',
  templateUrl: './article-setting.component.html',
  styleUrls: ['./article-setting.component.scss']
})
export class ArticleSettingComponent implements OnInit, OnDestroy {

  public isSettingOpen = true;
  public iconStatus = faAngleUp.iconName;
  public article: Article = new Article();
  public displayedDate: string;

  private subscription: Subscription;

  constructor(private articleEditor: ArticleEditorService) { }

  @Input()
  public type: SettingType;

  @Input()
  public name: string;

  @Input()
  public label: string;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.articleEditor.getArticle().subscribe(article => {
      this.article = article;
      if (this.type === 'createDate' && this.displayedDate === undefined) {
        this.displayedDate = this.parseDate(article.creationDate);
      }
    });
  }

  public openStatusSettings() {
    this.isSettingOpen = !this.isSettingOpen;
    if (this.isSettingOpen) {
      this.iconStatus = faAngleUp.iconName;
    } else {
      this.iconStatus = faAngleDown.iconName;
    }
  }

  public updateStatus() {
    this.articleEditor.updateStatus(this.article.status);
  }

  public updateToggle() {
    switch (this.type) {
      case 'allowComments':
        this.articleEditor.updateCommentsEnabled(this.article.hasCommentsEnabled);
        break;
      case 'showDateAuthor':
        this.articleEditor.updateDateAuthorEnabled(this.article.hasDateAuthorEnabled);
        break;
    }
  }

  public updateCreationDate() {
    let date: Date;
    if (!this.displayedDate) {
      date = new Date(this.article.creationDate);
      this.displayedDate = this.parseDate(date);
    } else {
      date = new Date(Date.parse(this.displayedDate));
      console.log(date);
    }
    this.articleEditor.updateCreationDate(date);
  }

  private parseDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let monthString = `${month}`;
    let dayString = `${day}`;
    if (month < 10) {
      monthString = `0${month}`;
    }
    if (day < 10) {
      dayString = `0${day}`;
    }
    return `${date.getFullYear()}-${monthString}-${dayString}`;

  }

}
