import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {BackendApiService} from '../../shared/services/backendapi.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public newUser = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private backendApiService: BackendApiService,
              public authService: AuthService,
              private toasterService: ToastrService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  // login() {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   if (this.loginForm.get('userName').value.toLowerCase() === 'admin' &&
  //     this.loginForm.get('password').value.toLowerCase() === 'pass123') {
  //     this.router.navigateByUrl('/dashboard/app-dashboard').then();
  //   } else {
  //     this.openToaster('User name or password is incorrect', 'Invalid Credentials !');
  //   }
  // }

  login() {
    this.authService.signIn(this.loginForm.value)
  }

  openToaster(message: string, title: string) {
    this.toasterService.error(message, title, {
      timeOut: 3000,
    });
  }

}
