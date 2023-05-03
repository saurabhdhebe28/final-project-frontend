import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private apiAdpter: ApiAdapterService) { }


  signUp(data: any) {
    let endpoint = 'http://localhost:3000/auth/signUp'
    return this.apiAdpter.post(endpoint, data)
  }
  login(data: any) {
    let endpoint = 'http://localhost:3000/auth/login'
    return this.apiAdpter.post(endpoint, data)
  }
  isLogin() {
    return localStorage.getItem('token')
  }
}
