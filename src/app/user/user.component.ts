import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  user: User;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getUser(params["userId"]);
    });
  }

  getUser(userId) {
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data;
    });
  }

  get isCurrentUser() {
    if (this.authService.currentUserId == this.user.id) return true;
    return false;
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }


}
