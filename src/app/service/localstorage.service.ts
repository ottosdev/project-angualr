import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

  saveLocalStorage(user: User) {
    this.set('admin', user.isAdmin);
    this.set('username', user.username);
    this.set('id', user.id);
  }

  getLocalStorage(key: string) {
    return this.get(key);
  }
}
