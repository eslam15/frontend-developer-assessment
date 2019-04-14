import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs-compat';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ToastService } from './toaster.service';


@Injectable()

export class UsersService {

    pendingRequests: number = 0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private httpClient: HttpClient, 
        private toastService: ToastService) { 
    }

    // base apis url
    private baseUrl = 'https://reqres.in/api';

    // get all users request
    getUsers() {
        this.blockUI.start();
        return this.httpClient.get(this.baseUrl + '/users')
            .catch((error: any) => {
                this.toastService.showError("Users can't be loaded!")
                return Observable.throw(error.json().error || 'Server error')
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
        return this.httpClient.get(this.baseUrl + "/users/" + id)
            .catch((error: any) => {
                this.toastService.showError("User details can't be loaded!")
                return Observable.throw(error.json().error || 'Server error')
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
        return this.httpClient.post(this.baseUrl + '/users', data)
            .catch((error: any) => {
                this.toastService.showError("User can't be created!")
                return Observable.throw(error.json().error || 'Server error')
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
        return this.httpClient.delete(this.baseUrl + '/users/' + id)  
            .catch((error: any) => {
                this.toastService.showError("User can't be deleted!")
                return Observable.throw(error);
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
