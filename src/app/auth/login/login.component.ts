import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../shared/services/auth.service";
import { ToastService } from '../../shared/services/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private toastService: ToastService,
  ) { }

  login() {
    this.auth.login(this.user.email, this.user.password)
      .subscribe(
        data => {
          if (data.status == 401) {
            this.toastService.showError("Invalid Email/Password ... ");
          } else {
            this.auth.setToken(data.body.token);
            this.router.navigate(['/users']);
          }
        }
    )
  }

  ngOnInit() {
  }

}
