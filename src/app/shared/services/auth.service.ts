import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs-compat'

import { ToastService } from './toaster.service';

@Injectable()
export class AuthService {

    @BlockUI() blockUI: NgBlockUI;

    // base apis url
    private baseUrl = 'https://reqres.in/api';

    token: string;

    // headers
    public headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${this.getIdToken()}`
    }

    constructor(
        private httpClient: HttpClient,
        private toastService: ToastService,
    ) {
    }

    isAuthenticated() {
        // check local storage for token
        let token = this.getIdToken();
        // if found check expiration
        if (!token) {
            return false;
        }
        return true;
    }

    login(email: string, password: string) {
        this.blockUI.start();
        return this.httpClient.post(this.baseUrl + '/login', { email, password }, { observe: 'response', 'headers': this.headers })
            .catch((error: any) => {
                this.toastService.showError(error.error.error || 'Server Error');
                return Observable.throw(error.error.error || 'Server Error')
            })
            .finally(() => {
                this.blockUI.stop();
            })
    }

    logout() {
        this.removeToken();
    }

    setToken(token: string) {
        localStorage.setItem("auth_token", token);
    }

    getIdToken(): string {
        return localStorage.getItem('auth_token');
    }

    removeToken() {
        localStorage.removeItem('auth_token');
    }

}
