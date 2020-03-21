export class Comment {
    commentId?: number;
    userName?: string;
    userMail?: string;
    commentText?: string;
    userRank?: string;
    articleId?: number;
    creationDate?: Date;
    answerOf?: number;
    answers?: Comment[];
}