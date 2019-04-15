import { Component, OnInit } from '@angular/core';

import { ModalDataService } from '../../shared/services/modal.service';
import { ToastService } from '../../shared/services/toaster.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, ToastService, ModalDataService]
})
export class UsersComponent implements OnInit {
  users: any = [];
  user = {};
  userId: number;
  currentUser = {};
  currentIndex: number;
  userDetails: boolean = false;
  url: string;
  imageFile: any;
  editBtn: boolean = false;


  constructor(
    private toastService: ToastService,
    private mdService: ModalDataService, 
    private usersService: UsersService
  ) { this.loadUsers(); }


  /*** Reset User Data ***/ 
  openModalData(content: any) {
    this.mdService.openDialog(content);
    this.user = {};
    this.url = null;
    this.imageFile = null;
    this.hideUserDeatils();
  }
  /*** Reset User Data ***/



  /*** All Userss Data Methods ***/
  // load all users
  loadUsers() {
    this.usersService.getUsers()
      .subscribe((data: { body: { data: any }; }) => {
        this.users = data.body.data;
      })
  }
  /*** All Userss Data Methods ***/



  /*** Single User Data Methods ***/
  // show user details aside
  showUserDeatils() {
    this.userDetails = true;
  }
  // hide user details aside
  hideUserDeatils() {
    this.user = {};
    this.userDetails = false;
  }
  // load single user
  loadUser(id: number) {
    this.user = {};
    this.usersService.getUser(id)
      .subscribe((user: { body: { data: { first_name?: any; last_name?: any; }; }; }) => {
        this.user = user.body.data;
        this.toastService.showSuccess(`${user.body.data.first_name} ${user.body.data.last_name} data is loaded successfully`);
        console.log(user.body.data)
      })
  }



  /**
   * Create Single User
   */
  onAdd() {
    this.editBtn = false;
  }
  submitCreateUser() {
    this.usersService.createUser(this.user)
      .subscribe((data: { body: any; }) => {
        let user = data.body;
        this.users.push(user);
        this.mdService.closeDialog();
        this.toastService.showSuccess(`${user.body.data.first_name} ${user.body.data.last_name} is added successfully`);
      })
  }
  



  /*** Update Single User ***/
  onUpdate() {
    this.editBtn = true;
  }
  submitUpdateUser(id: any, user: any) {
    this.usersService.updateUser(id, user)
      .subscribe((user: any) => {
        this.user = user.body;
        this.mdService.closeDialog();
        this.toastService.showSuccess(`${user.body.first_name} ${user.body.last_name} is updated successfully`);
      })
  }
  /*** Update Single User ***/



  /*** Delete Single User methods ***/
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
        this.mdService.closeDialog();
        this.toastService.showSuccess(`${user.first_name} ${user.last_name} is deleted successfully`);
      })
  }
  /*** Delete Single User methods ***/


  ngOnInit() {
    
  }

}
