import { Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/modules/dashboard/services/notification/notification.service';
import { Article, ArticleStatus, Category, Notification, Status, Tag, User } from '../models';

/**  The editor has two modes, one for edit and one create articles.
 create means that the editor is creating a new article.
 edit means that the editor is editing an existing article.
 if the editor saves the new article, the editor switches to edit mode.
*/
export type Mode = 'edit' | 'create';

export abstract class ArticleEditorService {

    protected article: Article;
    protected mode: Mode = 'create';

    protected articleSubject: Subject<Article> = new Subject<Article>();

    constructor(private notificationService: NotificationService) { }

    public abstract addTag(tag: Tag): boolean;

    public abstract removeTag(tag: Tag): boolean;

    public abstract getTagList(): Observable<Tag[]>;

    public abstract addCategory(category: Category): boolean;

    public abstract removeCategory(category: Category): boolean;

    public abstract getCategories(): Observable<Category[]>;

    public abstract setArticleByTitle(title: string): void;

    public abstract createArticle(user: User): void;

    public abstract save(): void;

    public abstract update(): void;

    public setMode(mode: Mode): void {
        this.mode = mode;
    }

    public getMode(): Mode {
        return this.mode;
    }

    public updateText(text: string): void {
        this.article.articleText = text;
        this.saveOrUpdate();
    }

    public updateTitle(title: string): void {
        this.article.title = title;
        this.saveOrUpdate();
    }

    public updateStatus(status: ArticleStatus): void {
        this.article.status = status;
        this.saveOrUpdate();
    }

    public updateCreationDate(date: Date): void {
        this.article.creationDate = date;
        this.saveOrUpdate();
    }

    public updateCommentsEnabled(value: boolean): void {
        this.article.hasCommentsEnabled = value;
        this.saveOrUpdate();
    }

    public updateDateAuthorEnabled(value: boolean): void {
        this.article.hasDateAuthorEnabled = value;
        this.saveOrUpdate();
    }

    public quickDraftCreate(data: Partial<{title: string, text: string}>) {
      this.article.title = data.title;
      this.article.articleText = data.text;
      this.article.status = 'draft';
      this.saveOrUpdate();
    }

    public getArticle(): Observable<Article> {
        return this.articleSubject;
    }

    protected updateArticleObject(article: Article): void {
      this.article = article;
      this.articleSubject.next(this.article);
    }

    protected createMessage(status: Status, message: string): void {
      const notification: Notification = {
        date: new Date(Date.now()),
        message: message,
        status: status
      };
      this.notificationService.pushNotification(notification);
    }

    private saveOrUpdate() {
      if (!this.article.title) {
        // No title was set.
        this.notificationService.pushNotification({
          date: new Date(Date.now()),
          message: 'Es wurde noch kein Titel festgelegt.',
          status: Status.Info
        });
        return;
      }

      this.articleSubject.next(this.article);
      if (this.mode === 'create') {
          this.save();
      } else {
          this.update();
      }
    }
}
