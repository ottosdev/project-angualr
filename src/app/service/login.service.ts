import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignIn } from '../model/SignIn';
import { User } from '../model/User';
import { environment } from './../../environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: 'http://localhost:3000/user';
  constructor(
    private http: HttpClient,
    private localService: LocalstorageService
  ) {}

  signup(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user', user);
  }

  signin(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  logout() {
    this.localService.clear();
  }

  getLoginStatus() {
    return this.localService.get('login');
  }

  getUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      return JSON.parse(username);
    }
    return '';
  }

  getIsAdmin() {
    return !!this.localService.get('admin');
  }

  loginLogout() {
    this.localService.clear();
  }

  getIdUser() {
    return this.localService.get('id');
  }
}
