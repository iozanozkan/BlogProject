import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-last-posts',
  templateUrl: './last-posts.component.html',
  styleUrls: ['./last-posts.component.css']
})
export class LastPostsComponent implements OnInit {

  constructor(private postService: PostService) { }
  posts: Post[];
  ngOnInit() {
    this.postService.getLastPosts().subscribe(data => {
      this.posts = data;
    })
  }

}
