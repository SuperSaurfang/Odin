
import { User } from '@auth0/auth0-angular';
export class Comment {
    commentId?: number;
    userMail?: string;
    commentText?: string;
    articleTitle?: string;
    articleId?: number;
    creationDate?: Date;
    answerOf?: number;
    replies?: Comment[];
    userId?: string;
    user?: User;
    status?: string;
}
