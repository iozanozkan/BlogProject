import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, AuthService]
})
export class PostDetailComponent implements OnInit {

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  post: Post;
  postId: number;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params["postId"]
      this.getPostById(this.postId)
    });
  }

  getPostById(postId) {
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data;
    });
  }

  isAdmin() {
    return this.authService.isAdmin;
  }
}
