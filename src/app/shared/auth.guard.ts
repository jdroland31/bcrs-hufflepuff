/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//The AuthGuard can be used to intercept unauthorized route access.

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }
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
}


