import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostOfCategoryComponent } from './post/post-of-category/post-of-category.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginGuardService } from './services/loginGuard.service';
import { PostUpdateComponent } from './post/post-update/post-update.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

export const appRoutes: Routes = [
    { path: "post", component: PostComponent },
    { path: "postDetail/:postId", component: PostDetailComponent },
    { path: "postAdd", component: PostAddComponent, canActivate: [LoginGuardService] },
    { path: "postUpdate/:postId", component: PostUpdateComponent, canActivate: [LoginGuardService] },
    { path: "userUpdate", component: UserUpdateComponent },
    { path: "byCategory/:categoryId", component: PostOfCategoryComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "user/:userId", component: UserComponent },
    { path: "**", redirectTo: "post", pathMatch: "full" }
];
