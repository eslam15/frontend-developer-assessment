import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router, 
    private auth: AuthService, 
  ) { }

  // login method
  login() {
    this.auth.login(this.user.email, this.user.password)
      .subscribe(
        (data: { body: { token: string; }; }) => {
          this.auth.setToken(data.body.token);
          this.router.navigate(['/users']);    
        }
    )
  }

  ngOnInit() {

  }

}
