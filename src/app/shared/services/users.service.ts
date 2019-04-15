import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs-compat';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthService } from './auth.service';
import { ToastService } from './toaster.service';


@Injectable()

export class UsersService {

    pendingRequests: number = 0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private httpClient: HttpClient,
        private auth: AuthService, 
        private toastService: ToastService) { 
    }

    // base apis url
    private baseUrl = 'https://reqres.in/api';

    // get all users request
    getUsers() {
        this.blockUI.start();
        return this.httpClient.get(this.baseUrl + '/users', { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.toastService.showError(error.message || 'Server Error')
                return Observable.throw(error.message || 'Server Error')
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
        return this.httpClient.get(this.baseUrl + "/users/" + id, { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.toastService.showError(error.message || 'Server Error')
                return Observable.throw(error.message || 'Server Error')
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
        return this.httpClient.post(this.baseUrl + '/users', data, { observe: 'response', 'headers': this.auth.headers })
            .catch((error: any) => {
                this.toastService.showError(error.message || 'Server Error')
                return Observable.throw(error.message || 'Server Error')
            })
            .finally(() => {
                this.pendingRequests--;
                if (this.pendingRequests <= 0) {
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }

    // updateUser(id: any, data: any, {}) {
    //     this.blockUI.start();
    //     return this.httpClient.delete(this.baseUrl + '/users/' + id, data, { 'headers': this.authInterceptor.headers })
    //         .catch((error: any) => {
    //             this.toastService.showError("User can't be deleted!")
    //             return Observable.throw(error);
    //         })
    //         .finally(() => {
    //             this.pendingRequests--;
    //             if (this.pendingRequests <= 0) {
    //                 // there are no more pending requests
    //                 this.blockUI.stop();
    //             }
    //         }) as any;
    // }

    // delete single user request
    deleteUser(id: any) {
        this.blockUI.start();
        return this.httpClient.delete(this.baseUrl + '/users/' + id, { observe: 'response', 'headers': this.auth.headers })  
            .catch((error: any) => {
                this.toastService.showError(error.message || 'Server Error')
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
