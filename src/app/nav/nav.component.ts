import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [CategoryService]
})
export class NavComponent implements OnInit {

  constructor(private categoryService: CategoryService, private authService: AuthService) { }

  categories: Category[];

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

}
