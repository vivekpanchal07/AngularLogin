import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { IAuth } from 'src/app/interface/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: IAuth = {
    userid: 'admin',
    password: 'root',
  };

  loginForm!: FormGroup;
  message?: string;
  returnUrl!: string;
  submitted= false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      if (
        this.f['userid'].value == this.model.userid &&
        this.f['password'].value == this.model.password
      ) {
        console.log('Login successful');
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f['userid'].value);
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = 'Please check your userid and password';
      }
    }
  }
}
