import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  UrlTree | boolean {
    const token = localStorage.getItem('authToken');

    if( !token ) {
      return this.router.createUrlTree(['/registry']);
    }

    return true;
  }
}
