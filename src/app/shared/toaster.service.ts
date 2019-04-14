import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

    constructor(private toasterService: ToastrService) { }

    showSuccess(res: any) {
        this.toasterService.success('Success', res);
    }

    showError(err: any) {
        this.toasterService.error('Error', err);
    }
    
}
