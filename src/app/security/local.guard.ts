import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalGuard implements CanActivate, CanActivateChild {
  constructor(protected authService: AuthService, protected router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRoute();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRoute();
  }

  checkRoute(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return this.router.parseUrl('/');
    } else {
      return true;
    }
  }
}
