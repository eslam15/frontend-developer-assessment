import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public auth: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.isAuthenticated();
    }
}