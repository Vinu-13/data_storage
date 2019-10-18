import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  email = '';
  password = '';
  // matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log("res",res);
        console.log('token',res.Token)
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['products']);
        }
      }, (err) => {
        console.log(err);
      });
  }
  register() {
    this.router.navigate(['register']);
  }

}
