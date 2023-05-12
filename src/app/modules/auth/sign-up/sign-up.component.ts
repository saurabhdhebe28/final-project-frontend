import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    emailId: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
    mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(3)]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }


  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe((data) => {
      this.signUpForm.reset()
      this.router.navigate(['/auth/login'])
    })
  }
}
