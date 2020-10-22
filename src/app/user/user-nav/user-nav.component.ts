import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
  providers:[UserService]
})
export class UserNavComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  user: User;

  ngOnInit() {
    if (this.isAuthenticated) this.getUser();
  }

  getUser() {
    return this.userService.getUserById(this.authService.currentUserId).subscribe(data => {
      this.user = data;
    })
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

}
