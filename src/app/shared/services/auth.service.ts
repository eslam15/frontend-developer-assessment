import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs-compat';
import { ToastService } from './toaster.service';

@Injectable()
export class AuthService {

    @BlockUI() blockUI: NgBlockUI;

    private http: HttpClient;

    constructor(injector: Injector, private toastService: ToastService) {
        setTimeout(() => this.http = injector.get(HttpClient));
    }

    isAuthenticated() {
        // check local storage for token
        var token = this.getToken();

        // if found check expiration
        if (!token) {
            return false;
        }

        return true;
    }

    login(email: string, password: string) {
        this.blockUI.start();
        return this.http.post('http://52.174.22.188/yamam/public/api/admin/auth', { email, password })
            .catch((error: any) => {
                this.toastService.showError('error');
                return Observable.throw(error.json().error || 'Server error')
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

    public getToken(): string {
        return localStorage.getItem('auth_token');
    }

    removeToken() {
        localStorage.removeItem("auth_token");
    }

}
