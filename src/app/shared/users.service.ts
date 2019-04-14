import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs-compat';

import { ToastrService } from 'ngx-toastr';

@Injectable()

export class UsersService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

    private baseUrl = 'https://reqres.in/api';

    showSuccess(res: any) {
        this.toastr.success('Success', res);
    }

    showError(err: any) {
        this.toastr.error('Error', err);
    }
    

    getUsers() {
        return this.httpClient.get(this.baseUrl + '/users')
            .catch((error: any) => {
                this.showError("Can't load users!")
                return Observable.throw(error);
            })
    }

    getUser(id: Number) {
        return this.httpClient.get(this.baseUrl + "/users/" + id)
            .catch((error: any) => {
                this.showError("Can't load user!")
                return Observable.throw(error);
            })
    }

    createUser(data: any) {
        return this.httpClient.post(this.baseUrl + '/users', data)
            .catch((error: any) => {
                this.showError("Can't add user!")
                return Observable.throw(error);
            }) 
    }

    deleteUser(id: any) {
        return this.httpClient.delete(this.baseUrl + '/users/' + id)  
            .catch((error: any) => {
                this.showError("Somethin went wrong!")
                return Observable.throw(error);
            })       
    }

    
}
