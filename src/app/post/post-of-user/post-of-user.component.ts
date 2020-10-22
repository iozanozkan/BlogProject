import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-of-user',
  templateUrl: './post-of-user.component.html',
  styleUrls: ['./post-of-user.component.css']
})
export class PostOfUserComponent implements OnInit {

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  posts: Post[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPostsByUser(params["userId"]);
    });
  }

  getPostsByUser(userId) {
    this.postService.getPostsByUser(userId).subscribe(data => {
      this.posts = data;
    });
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

  isAdmin() {
    return this.authService.isAdmin;
  }


}
