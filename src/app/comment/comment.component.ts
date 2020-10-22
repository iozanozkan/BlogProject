import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentService, AuthService]
})
export class CommentComponent implements OnInit {

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  comments: Comment[];
  subComments: Comment[];
  comment: any;
  commentAddForm: FormGroup;
  showVar = [];
  @Input() postId: any;

  ngOnInit() {
  }

  ngOnChanges() {
    this.getCommentsByPost();
    this.getSubCommentsByPost();
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentAddForm = this.formBuilder.group(
      {
        text: ["", Validators.required]
      }
    )
  }

  showReplyComment(id) {
    for (let i = 0; i < this.showVar.length; i++) {
      if (id != i)
        this.showVar[i] = false;
    }
    this.showVar[id] = !this.showVar[id];
  }

  add(commentId) {
    if (this.commentAddForm.valid) {
      this.comment = Object.assign({}, this.commentAddForm.value)
      this.comment.userId = this.authService.currentUserId;
      this.comment.dateAdded = new Date();
      this.comment.postId = this.postId;
      this.comment.parentId = commentId
      this.commentService.add(this.comment).subscribe(data => {
        this.comment = data
        this.userService.getUserById(this.comment.userId).subscribe(data => {
          this.comment.userName = data.name
          this.comment.userSurname = data.surname
          this.comment.userPhotoUrl = data.photoUrl
          if (this.comment.parentId !== null)
            this.subComments.unshift(this.comment)
          else
            this.comments.unshift(this.comment)
          this.createCommentForm()
        })
      })
    }
  }

  delete(comment) {
    console.log(comment)
    this.commentService.delete(comment).set({
      onclosing: () => {
        for (let i = 0; i <= this.subComments.length; i++) {
          if (comment == this.subComments[i]) {
            this.subComments.splice(i, 1)
          }
        }
        for (let i = 0; i <= this.comments.length; i++) {
          if (comment == this.comments[i]) {
            this.comments.splice(i, 1)
          }
        }
      }
    })
  }

  getCommentsByPost() {
    this.commentService.getCommentsByPost(this.postId).subscribe(data => {
      this.comments = data;
    })
  }

  getSubCommentsByPost() {
    this.commentService.getSubCommentsByPost(this.postId).subscribe(data => {
      this.subComments = data;
    })
  }

  commentHasCurrentUser(userId) {
    if (this.authService.isAdmin || userId == this.authService.currentUserId) return true;
    else return false;
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
