import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import {
  CheckAuthQuery, CheckAuthQueryVariables, CheckAuthGQL
} from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  checkAuthQueryRef: QueryRef<CheckAuthQuery, CheckAuthQueryVariables>;

  constructor(private router: Router, private checkAuthGQL: CheckAuthGQL) {
    this.checkAuthQueryRef = this.checkAuthGQL.watch();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  UrlTree | Observable<boolean | UrlTree> {
    const token = localStorage.getItem('authToken');

    if ( !token ) {
      return this.router.createUrlTree(['/registry']);
    }

    return this.checkAuthQueryRef.valueChanges.pipe(
      pluck('data', 'viewer'),
      map(viewer => !!viewer || this.router.createUrlTree(['/registry']))
    );
  }
}
