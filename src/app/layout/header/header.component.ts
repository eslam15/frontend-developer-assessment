import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = false;
  
  constructor(private auth: AuthService) { }

  // collapse navbar on mobiles and tablet
  collapse() {
    this.collapsed = !this.collapsed;
  }

  // logout method
  logout() {
    this.auth.logout();
  }

  ngOnInit() {

  }

}
