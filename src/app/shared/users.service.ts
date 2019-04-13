import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class UsersService {

    constructor(private httpClient: HttpClient) { }

    private baseUrl = 'https://reqres.in/api';

    getUsers() {
        return this.httpClient.get(this.baseUrl + "/users")
    }

}
