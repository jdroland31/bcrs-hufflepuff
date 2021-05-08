/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: API - Sprint 3
 ***/
//The session guard prevents role routes from being accessed if an admin user is not signed in.
import { RoleService } from './../services/role.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private roleService: RoleService) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    /**
     * It gets the user role that just signed in,
     * it filters the roles that are admin and it routes
     * to whatever navigation it is set in the routing module
     */
    return this.roleService.findUserRole(this.cookieService.get('session_user')).pipe(map(res =>
    {
      console.log('inside the role guard');
      console.log(res)
      if (res['data'].role === 'admin')
      {
        return true;
      }
      else
      {
        this.router.navigate(['/']);
        return false;
      }
    }));
    }
}
