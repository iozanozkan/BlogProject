import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-of-category',
  templateUrl: './post-of-category.component.html',
  styleUrls: ['./post-of-category.component.css']
})
export class PostOfCategoryComponent implements OnInit {

  constructor(private postService: PostService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private categoryService: CategoryService) { }

  posts: Post[];
  categoryName: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPostsByCategory(params["categoryId"]);
      this.getCategory(params["categoryId"]);
    });
  }

  getPostsByCategory(categoryId){
    this.postService.getPostsByCategory(categoryId).subscribe(data => {
      this.posts = data;
    });
  }

  getCategory(categoryId){
    this.categoryService.getCategory(categoryId).subscribe(data=>{
      this.categoryName = data.name;
    })
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
