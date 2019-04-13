import { Component, OnInit } from '@angular/core';

import { ModalDataService } from '../../../shared/modal.service';

@Component({
  selector: 'app-users-header',
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.scss']
})


export class UsersHeaderComponent implements OnInit {

  url: string;
  imageFile: any;

  constructor(private mdService: ModalDataService) { }
  
  openModalData(content: any) {
    this.mdService.openDialog(content);
    this.url = null;
    this.imageFile = null;
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
