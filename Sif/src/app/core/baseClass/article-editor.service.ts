import { of, Observable, Subject } from "rxjs";
import { Article, Category } from "..";

type Type = 'blog' | 'page'
type Mode = 'edit' | 'create'

export abstract class ArticleEditorService {

    protected article: Article;
    protected mode: Mode = 'create'
    
    protected articleSubject: Subject<Article> = new Subject<Article>();

    readonly type: Type;

    constructor(type: Type) {
        this.type = type;
    }

    public setMode(mode: Mode): void {
        this.mode = mode;
    }

    public getMode(): Mode {
        return this.mode;
    }

    public updateText(text: string) : void {
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
        this.article.creationDate.setFullYear(date.getFullYear());
        this.article.creationDate.setMonth(date.getMonth());
        this.article.creationDate.setDate(date.getDate());
        this.saveOrUpdate();
    }

    public updateCommentsEnabled(): void {
        this.article.hasCommentsEnabled = !this.article.hasCommentsEnabled;
        this.saveOrUpdate();
    }

    public updateDateAuthorEnabled(): void {
        this.article.hasDateAuthorEnabled = this.article.hasDateAuthorEnabled;
        this.saveOrUpdate();
    }

    public abstract addCategory(category: string): boolean;

    public abstract removeCategory(category: string): boolean;

    public getArticle(): Observable<Article> {
        return this.articleSubject;
    }

    public abstract getCategories(): Observable<string[]>;

    public abstract setArticleByTitle(title: string): void;

    public abstract createArticle(userId: string): void;

    public abstract save(): void;

    public abstract update(): void;

    private saveOrUpdate() {
        this.articleSubject.next(this.article);
        if (this.mode === 'create') {
            this.save();
        }
        else {
            this.update();
        }
    }
}