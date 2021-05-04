/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Base Layout - Sprint 1
 ***/

// BCRS main web template

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  userRole: string;

  constructor(private cookieService: CookieService, private router: Router, private roleService: RoleService) {
    //finds the user role of the signed-in user
    this.roleService.findUserRole(this.cookieService.get('session_user')).subscribe(res => {
      this.userRole = res['data'].role;
      console.log("this is the output from baselayout")
      console.log(this.userRole)
    })


    }


  ngOnInit(): void {
  }

  showMenu(){
    console.log('Show Menu');
  }
  //This function destroys all cookie sessions to allow the user to sign out. It then navigates them to the sign in page.
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
    }
}
