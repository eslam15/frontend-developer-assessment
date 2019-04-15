import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs-compat';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthService } from './auth.service';
import { ToastService } from './toaster.service';
import { ModalDataService } from './modal.service';


@Injectable()

export class UsersService {

    pendingRequests: number = 0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private httpClient: HttpClient,
        private auth: AuthService, 
        private toastService: ToastService,
        private mdService: ModalDataService) { 
    }


    // get all users request
    getUsers() {
        this.blockUI.start();
        return this.httpClient.get(this.auth.baseUrl + '/users', { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.mdService.closeDialog();
                this.toastService.showError(error.message || 'Server Error');
                return Observable.throw(error.message || 'Server Error');
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }

    // get single user request
    getUser(id: Number) {
        this.blockUI.start();
        return this.httpClient.get(this.auth.baseUrl + '/users/' + id, { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.mdService.closeDialog();
                this.toastService.showError(error.message || 'Server Error');
                return Observable.throw(error.message || 'Server Error');
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }

    // create single user request
    createUser(data: any) {
        this.blockUI.start();
        return this.httpClient.post(this.auth.baseUrl + '/users', data, { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.mdService.closeDialog();
                this.toastService.showError(error.message || 'Server Error');
                return Observable.throw(error.message || 'Server Error');
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }

    // update single user data
    updateUser(id: any, data: any) {
        this.blockUI.start();
        return this.httpClient.put(this.auth.baseUrl + '/users/' + id, data, { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.mdService.closeDialog();
                this.toastService.showError(error.message || 'Server Error');
                return Observable.throw(error.message || 'Server Error');
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }

    // delete single user request
    deleteUser(id: any) {
        this.blockUI.start();
        return this.httpClient.delete(this.auth.baseUrl + '/users/' + id, { observe: 'response', 'headers': this.auth.headers })  
            .catch((error: any) => {
                this.mdService.closeDialog();
                this.toastService.showError(error.message || 'Server Error');
                return Observable.throw(error.message || 'Server Error');
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;   
    }

}
