import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private apiAdpter: ApiAdapterService ) {
    const status = localStorage.getItem('token');
    if (status) {
      this.loggedIn.next(true);
    }
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  loginStatus() {
    this.loggedIn.next(true)
  }
  signUp(data: any) {
    let endpoint = 'http://localhost:3000/auth/signUp'
    return this.apiAdpter.post(endpoint, data)
  }
  login(data: any) {
    let endpoint = 'http://localhost:3000/auth/login'
    return this.apiAdpter.post(endpoint, data)
  }
  isLogin() {
    if (localStorage.getItem('token')) {
      return true
    }
    else {
      return false
    }
  }
}