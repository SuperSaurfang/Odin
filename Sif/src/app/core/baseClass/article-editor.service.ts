import { Observable, Subject } from 'rxjs';
import { Article, Category, Message, MessageType, User } from '../models';

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
    protected messageSubject: Subject<Message> = new Subject<Message>();

    constructor() {

    }

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

    public updateStatus(status: string): void {
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

    public getArticle(): Observable<Article> {
        return this.articleSubject;
    }

    public getMessage(): Observable<Message> {
      return this.messageSubject;
    }

    protected createMessage(type: MessageType, messageContent: string): void {
      const message = new Message();
      message.messageType = type;
      message.messageContent = messageContent;
      this.messageSubject.next(message);
    }

    private saveOrUpdate() {
      if (!this.article.title) {
        // No title was set.
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
