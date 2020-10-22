import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  path = "https://localhost:44392/api/"

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.path + "users");
  }

  getUserById(user): Observable<User> {
    return this.httpClient.get<User>(this.path + "users/byId/?id=" + user);
  }

  createImgPath(serverPath: string) {
    return `https://localhost:44392/${serverPath}`;
  }
}
