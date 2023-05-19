import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submitted = false;
  loginForm = this.formBuilder.group({
    emailId: [
      '',
      [Validators.required, Validators.email, Validators.minLength(5)],
    ],
    password: [
      '',
      [Validators.required, Validators.maxLength(12), Validators.minLength(3)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data) => {
        if (data.status == true) {
          this.authService.loginStatus();
          localStorage.setItem('token', data.token);
          this.router.navigate(['/dashboard/charts']);
        }
      });
    }
  }
}
