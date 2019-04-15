import { Component, OnInit } from '@angular/core';

import { ModalDataService } from '../../shared/services/modal.service';
import { ToastService } from '../../shared/services/toaster.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
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
    ) { this.loadUsers() }

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
      .subscribe((data: { data: any; }) => {
        this.users = data.data;
      })
  }

  // load single user
  loadUser(id: number) {
    this.usersService.getUser(id)
      .subscribe((user: { data: { first_name?: any; last_name?: any; }; }) => {
        this.user = user.data;
        this.toastService.showSuccess(`${user.data.first_name} ${user.data.last_name} data is loaded successfully`);
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
        this.mdService.closeDialog();
        this.toastService.showSuccess(`${user.first_name} ${user.last_name} is deleted successfully`);
      })
  }


  openModalData(content: any) {
    this.mdService.openDialog(content);
    this.user = {};
    this.url = null;
    this.imageFile = null;
  }

  submitCreateUser() {
    this.usersService.createUser(this.user)
      .subscribe((data: any) => {
        let user = data;
        this.users.push(user);
        this.mdService.closeDialog();
      })
  }

  // submitUpdateUser() {
  //   this.usersService.updateUser(this.user)
  //     .subscribe((data: any) => {
  //       let user = data;
  //       this.users.push(user);
  //       this.mdService.closeDialog();
  //     })
  // }

  // previewImage(e: any): void {
  //   let fileList: FileList = e.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     this.imageFile = file;
  //     var reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.url = e.target.result;
  //     }

  //     reader.readAsDataURL(e.target.files[0]);

  //   }
  // }

  ngOnInit() {
  }

}
