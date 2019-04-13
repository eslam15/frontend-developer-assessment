import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable()

export class UsersService {

    constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

    private baseUrl = 'https://reqres.in/api';

    showSuccess() {
        this.toastr.success('', 'Toastr fun!');
    }

    showError() {
        this.toastr.error('Error', 'Something went wrong!');
    }

    getUsers() {
        return this.httpClient.get(this.baseUrl + "/users")
    }

    createUser(data: any) {
        return this.httpClient.post(this.baseUrl + "/users", data)
    }

    deleteUser(id: any) {
        return this.httpClient.delete(this.baseUrl + "/users/" + id)         
    }

}
