import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs-compat';

import { ToastService } from './toaster.service';

@Injectable()
export class UsersService {

    constructor(
        private httpClient: HttpClient, 
        private toastService: ToastService) { 
    }

    // base apis url
    private baseUrl = 'https://reqres.in/api';

    // get all users request
    getUsers() {
        return this.httpClient.get(this.baseUrl + '/users')
            .catch((error: any) => {
                this.toastService.showError("Users can't be loaded!")
                return Observable.throw(error);
            })
    }

    // get single user request
    getUser(id: Number) {
        return this.httpClient.get(this.baseUrl + "/users/" + id)
            .catch((error: any) => {
                this.toastService.showError("User details can't be loaded!")
                return Observable.throw(error);
            })
    }

    // create single user request
    createUser(data: any) {
        return this.httpClient.post(this.baseUrl + '/users', data)
            .catch((error: any) => {
                this.toastService.showError("User can't be created!")
                return Observable.throw(error);
            }) 
    }

    // delete single user request
    deleteUser(id: any) {
        return this.httpClient.delete(this.baseUrl + '/users/' + id)  
            .catch((error: any) => {
                this.toastService.showError("User can't be deleted!")
                return Observable.throw(error);
            })       
    }

    
}
