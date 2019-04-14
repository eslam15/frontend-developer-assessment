import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../shared/users.service';

import { ModalDataService } from '../../../shared/modal.service';


@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any = [];
  user = {};
  currentUser = {};
  currentIndex: any;
  userDetails: boolean = false;

  constructor(private mdService: ModalDataService, private usersService: UsersService) { 
    this.loadUsers();
  }

  // show user details aside
  showUserDeatils() {
    this.userDetails = true;
  }

  // hide user details aside
  hideUserDeatils() {
    this.userDetails = false;
    this.user = {};
  }

  // load all users
  loadUsers() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data.data;
      })
  }

  // load single user
  loadUser(id: number) {
    this.usersService.getUser(id)
      .subscribe(user => {
        this.user = user.data;
      })
  }

  // open delete modal
  openModalDelete(content: any) {
    this.mdService.openDialog(content);
  }

  // show confirm delete message
  confirmDeleteUser(user: any, index: any) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  // delete single user
  deleteUser(user: any) {
    this.usersService.deleteUser(user.id)
      .subscribe(() => {
        let i = this.users.findIndex(function (user: any) {
          return user.id == user.id;
        });
        this.users.splice(i, 1);
        this.currentIndex = null;
      })
  }

  ngOnInit() {

  }

}
