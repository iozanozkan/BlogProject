import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  constructor(private postService: PostService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  post: Post;
  postId: number;
  categories: Category[];
  postUpdateForm: FormGroup;
  previewUrl: any = null;
  response: { dbPath } = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params["postId"];
      this.getPostById(this.postId);
      this.getCategories();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  getPostById(postId) {
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data;
      this.postUpdateForm = this.formBuilder.group(
        {
          title: [this.post.title, Validators.required],
          categoryId: [this.post.categoryId, Validators.required],
          text: [this.post.text, Validators.required],
        }
      )
    });
  }

  update() {
    if (this.postUpdateForm.valid) {
      this.post = Object.assign({}, this.postUpdateForm.value)
      this.post.photoUrl = this.response != null ? this.response.dbPath : this.post.photoUrl;
      this.postService.update(this.postId, this.post);
    }
  }

  uploadFinished(event){
    this.response = event;
  }

}
