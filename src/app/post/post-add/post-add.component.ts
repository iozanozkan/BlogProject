import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
  providers: [PostService, CategoryService, AuthService]
})
export class PostAddComponent implements OnInit {

  constructor(private postService: PostService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  post: Post;
  categories: Category[];
  postAddForm: FormGroup; 
  response: {dbPath: ''};

  ngOnInit() {
    this.createPostForm();
    this.getCategories();
  }

  createPostForm() {
    this.postAddForm = this.formBuilder.group(
      {
        title: ["", Validators.required],
        categoryId: ["", Validators.required],
        text: ["", Validators.required],
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  uploadFinished(event){
    this.response = event;
  }
  
  add() {
    if (this.postAddForm.valid) {
      this.post = Object.assign({}, this.postAddForm.value)
      this.post.userId = this.authService.currentUserId;
      this.post.photoUrl = this.response.dbPath;
      this.postService.add(this.post);
    }
  }

}
