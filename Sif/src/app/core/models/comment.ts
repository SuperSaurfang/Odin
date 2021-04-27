
import { User } from './user';
export class Comment {
    commentId?: number;
    userMail?: string;
    commentText?: string;
    articleTitle?: string;
    articleId?: number;
    creationDate?: Date;
    answerOf?: number;
    answers?: Comment[];
    userId?: string;
    user?: User;
    status?: string;
}
