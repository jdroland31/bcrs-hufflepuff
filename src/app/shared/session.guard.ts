/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//The session guard prevents routes from being accessed if the user is not signed in.
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private router: Router, private cookieService: CookieService){}
//This function checks if the session_user cookie is set. If not it navigates the user back to the sign in page.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isAuthenticated = this.cookieService.get('session_user');

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);
      console.log("Not authorized - log in, please");
      return false;
    }
  }
//This function can be used to unset a user session.
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
