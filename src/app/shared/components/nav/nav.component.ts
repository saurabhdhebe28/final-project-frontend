import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  {
  constructor(private router: Router, private authService: AuthService) {
  }
  isLogin: boolean = false

  // ngOnInit(): void {
  //   this.setLog()
  // }
  setLog() {
    this.isLogin = localStorage.getItem('token') ? true : false
  }

  toLogin() {
    this.router.navigate(['/auth/login'])

  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])

  }
}
