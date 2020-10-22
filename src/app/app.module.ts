import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostOfCategoryComponent } from './post/post-of-category/post-of-category.component';
import { CategoryComponent } from './category/category.component';
import { LastPostsComponent } from './post/last-posts/last-posts.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostUpdateComponent } from './post/post-update/post-update.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UploadUserPhotoComponent } from './upload/upload-user-photo/upload-user-photo.component';
import { UploadPostPhotoComponent } from './upload/upload-post-photo/upload-post-photo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { PostOfUserComponent } from './post/post-of-user/post-of-user.component';
import { AlertifyService } from './services/alertify.service';
import { LoginGuardService } from './services/loginGuard.service';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { CommentComponent } from './comment/comment.component';
import { UpdateInfoComponent} from './user/user-update/update-info/update-info.component';
import { UpdatePasswordComponent} from './user/user-update/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDetailComponent,
    CategoryComponent,
    PostOfCategoryComponent,
    LastPostsComponent,
    PostAddComponent,
    UploadUserPhotoComponent,
    UploadPostPhotoComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NavComponent,
    UserNavComponent,
    PostOfUserComponent,
    PostUpdateComponent,
    UserUpdateComponent,
    CommentComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    EditorModule
  ],
  providers: [AlertifyService, LoginGuardService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
