import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    pendingRequests: number = 0;

    @BlockUI() blockUI: NgBlockUI;

    constructor(public auth: AuthService, private router: Router) { }

    

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // increment to track the number of pending requests
        this.pendingRequests++;

        // Clone the request to add the new header.

        //send the newly created request
        return next.handle(req)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  // do stuff with response and headers you want
                  if(event.data.code == 401){
                      this.auth.removeToken();
                      this.router.navigate(['/login']);
                  }
                }
                return event; 
            })
            .catch((error) => {
                if (error.status === 400) {
                    this.auth.removeToken();
                } else {
                    return Observable.throw(error);
                }
            })
            .finally(() => {
                this.pendingRequests--;
                if(this.pendingRequests <= 0){
                    // there are no more pending requests
                    this.blockUI.stop();
                }
            }) as any;
    }
}