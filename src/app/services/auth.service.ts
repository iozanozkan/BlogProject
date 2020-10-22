import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
import { UpdatePassword } from '../models/updatePassword';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService) { }
  path = "https://localhost:44392/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json",);
    headers.append("Authorization", "token");
    this.httpClient
      .post(this.path + "login", loginUser, { responseType: 'text', headers: headers },)
      .subscribe(
        data => {
          this.saveToken(data);
          this.userToken = data;
          this.decodedToken = this.jwtHelper.decodeToken(data.toString());
          localStorage.setItem('ROLE', this.decodedToken.role);
          this.alertifyService.success("Giriş başarıyla yapıldı.");
          this.router.navigateByUrl("/post");
        },
        error => {
          this.alertifyService.error("Kullanıcı adı veya şifre hatalı!");
        });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "register", registerUser, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success("Kayıt işleminiz başarıyla yapıldı. Sisteme giriş yapabilirsiniz.");
        this.router.navigateByUrl("/login");
      },
        error => {
          this.alertifyService.error("Bu kullanıcı adı veya e-mail adresi kullanılmakta!");
        });
  }

  update(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "update/?id=" + this.currentUserId, registerUser, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success("Bilgilerinizi güncelleme işleminiz başarıyla yapıldı.");
        this.router.navigateByUrl("/user/"+this.currentUserId);
      },
        error => {
          this.alertifyService.error("Bu kullanıcı adı veya e-mail adresi kullanılmakta!");
        });
  }

  updatePassword(updatePassword: UpdatePassword) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "updatePassword/?id=" + this.currentUserId, updatePassword, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success("Şifre güncelleme işleminiz başarıyla yapıldı.");
        this.router.navigateByUrl("/userUpdate");
      },
        error => {
          this.alertifyService.error("Girdiğiniz şifre yanlış!");
        });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.warning("Çıkış yapıldı.");
  }

  loggedIn() {
    const token: string = this.token;
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get getRole() {
    return localStorage.getItem('ROLE');
  }

  get isAdmin() {
    if (this.getRole == "Admin")
      return true;
    return false;
  }

  get currentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid
  }
}