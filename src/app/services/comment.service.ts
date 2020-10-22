import { Injectable, ɵɵqueryRefresh } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from "../models/comment";
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) { }

  path = "https://localhost:44392/api/comments/";

  getCommentsByPost(postId): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.path + "byPost/?id=" + postId);
  }

  getSubCommentsByPost(postId): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.path + "subByPost/?id=" + postId);
  }

  add(comment) {
    return this.httpClient.post(this.path + "add", comment)
  }

  delete(comment) {
    return this.alertifyService.delete(comment.text + " yorumunuzu silmek istediğinize emin misiniz?", "Yorumu Sil").set('onok', () => {
      this.httpClient.post(this.path + "delete", comment).subscribe(() => {
        this.alertifyService.success("Yapmış olduğunuz yorum silindi.");
      })
    })
  }
}
