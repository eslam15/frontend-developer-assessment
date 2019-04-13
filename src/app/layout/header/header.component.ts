import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = false;

  constructor() { }

  // collapse navbar on mobiles and tablet
  collapse() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
  }

}
