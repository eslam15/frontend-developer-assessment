import { Component, OnInit } from '@angular/core';

import { ModalDataService } from '../../shared/modal.service';

import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  url: string;
  imageFile: any;
  users: any = [];
  user = {
    first_name: '',
    job: '',
    avatar: ''
  };

  constructor(private mdService: ModalDataService, private usersService: UsersService) {
  }


  openModalData(content: any) {
    this.mdService.openDialog(content);
    this.url = null;
    this.imageFile = null;
  }

  // get all users
  loadUsers() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data.data;
        console.log(this.users)
      })
  }

  submitCreateUser() {
    let formData: FormData = new FormData();
    formData.append('name', this.user.first_name);
    formData.append('job', this.user.job);

    if (this.imageFile) {
      let file: File = this.imageFile;
      formData.append('avatar', file, file.name);
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

    }

    this.usersService.createUser(this.user)
      .subscribe(data => {
        let user = data;
        this.users.push(user);
        console.log(this.users)
      })
  }

  previewImage(e: any): void {
    let fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.imageFile = file;
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
      }

      reader.readAsDataURL(e.target.files[0]);

    }
  }

  ngOnInit() {
  }

}
