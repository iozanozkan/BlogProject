import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { AlertifyService } from "./alertify.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

  path = "https://localhost:44392/api/"

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.path + "posts");
  }

  getLastPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.path + "posts/lastPosts");
  }

  getPostById(postId): Observable<Post> {
    return this.httpClient.get<Post>(this.path + "posts/detail/?id=" + postId);
  }

  getPostsByCategory(categoryId): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.path + "posts/byCategory/?id=" + categoryId);
  }

  getPostsByUser(userId): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.path + "posts/byUser/?id=" + userId);
  }

  add(post){
    this.httpClient.post(this.path + "posts/add", post).subscribe(data => {
      this.router.navigateByUrl('/post')
      this.alertifyService.success("Gönderiniz başarıyla eklendi.");
    });
  }

  update(postId, post){
    this.httpClient.post(this.path + "posts/update/?id=" + postId, post).subscribe(data => {
      this.alertifyService.success("Gönderi başarıyla güncellendi.");
      this.router.navigateByUrl('/postDetail/' + postId);
    });
  }

  delete(post){
    return this.alertifyService.delete(post.title + " başlıklı yazıyı silmek istediğinize emin misiniz?", "Yazıyı Sil").set('onok', () => {
      this.httpClient.post(this.path + "posts/delete", post).subscribe(() => {
        this.alertifyService.success("Yazı silindi.");
      })
    })
  }

  createImgPath(serverPath: string) {
    return `https://localhost:44392/${serverPath}`;
  }
}
