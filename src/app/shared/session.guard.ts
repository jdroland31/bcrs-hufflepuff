import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private router: Router, private cookieService: CookieService){}

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

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
