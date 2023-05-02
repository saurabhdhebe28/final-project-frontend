import { Injectable } from '@angular/core';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiAdpter: ApiAdapterService) { }
  signUp(data: any) {
    let endpoint = 'http://localhost:3001/auth/signUp'
    return this.apiAdpter.post(endpoint, data)
  }
  login(data: any) {
    let endpoint = 'http://localhost:3001/auth/login'
    return this.apiAdpter.post(endpoint, data)
  }
}
