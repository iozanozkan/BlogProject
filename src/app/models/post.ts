import { Comment } from "./comment";

export class Post {
    id: number;
    userId: number;
    userName: string;
    userSurname: string;
    categoryId: number;
    categoryName: string;
    title: string;
    text: string;
    photoUrl: string;
    dateAdded: Date;
    dateUpdated: Date;
    comments: Comment[];
}
