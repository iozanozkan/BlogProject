export class Comment {
    id: number;
    userId: number;
    userName: string;
    userSurname: string;
    userPhotoUrl: string;
    postId: number;
    text: string;
    dateAdded: Date;
    parentId: number;
    subComments: Comment[];
}
