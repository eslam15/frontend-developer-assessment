import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/users.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any = [];

  constructor(private usersService: UsersService) { 
    this.loadUsers();
  }

  // get all users
  loadUsers() {
    this.usersService.getUsers()
      .subscribe(data => {
        return this.users = data.data;
      })
  }

  ngOnInit() {
  }

}
