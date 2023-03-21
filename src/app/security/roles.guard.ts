import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard extends AuthGuard {
  override canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let result = super.canActivate(route, state)
      if (!result) return result;

      return this.checkRole(route);
  }

  override canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let result = super.canActivateChild(childRoute, state)
      if (!result) return result;

      return this.checkRole(childRoute);
  }

  checkRole(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!route.data['roles']) return true;

    if (this.authService.isHasOneOfRoles(route.data['roles'])) return true;
    else return this.router.parseUrl('/');
  }
  
}
