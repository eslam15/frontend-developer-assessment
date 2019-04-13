import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalDataService {

    constructor(private modalService: NgbModal) { }

    openDialog(content: any) {
        this.modalService.open(content, { centered: true });
    }

}
