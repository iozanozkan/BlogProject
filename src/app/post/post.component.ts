import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, AuthService]
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService, private authService: AuthService) { }

  posts: Post[];

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    })
  }

  isAdmin() {
    return this.authService.isAdmin;
  }

  delete(post){    
    this.postService.delete(post).set({
      onclosing: () => {
        for (let i = 0; i <= this.posts.length; i++) {
          if (post == this.posts[i]) {
            this.posts.splice(i, 1)
          }
        }
      }
    })
  }
}
