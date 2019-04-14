import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../shared/users.service';

import { ModalDataService } from '../../../shared/modal.service';
import { ToastService } from '../../../shared/toaster.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any = [];
  user = {};
  currentUser = {};
  currentIndex: number;
  userDetails: boolean = false;

  constructor(
    private mdService: ModalDataService, 
    private usersService: UsersService, 
    private toastService: ToastService) { 
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
        this.toastService.showSuccess('Users list is loaded successfully');
      })
  }

  // load single user
  loadUser(id: number) {
    this.usersService.getUser(id)
      .subscribe(user => {
        this.user = user.data;
        this.toastService.showSuccess(`${user.data.first_name} ${user.data.last_name} is loaded successfully`);
      })
  }

  // open delete modal
  openModalDelete(content: any) {
    this.mdService.openDialog(content);
  }

  // show confirm delete message
  confirmDeleteUser(user: any, index: number) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  // delete single user
  deleteUser(user: any) {
    this.usersService.deleteUser(user.id)
      .subscribe(() => {
        let i = this.users.findIndex(function (userId: any) {
          return userId.id == user.id;
        });
        this.users.splice(i, 1);
        this.currentIndex = null;
        this.userDetails = false;
        this.user = {};
        this.toastService.showSuccess(`${user.first_name} ${user.last_name} is deleted successfully`);
      })
  }


  ngOnInit() {

  }

}
