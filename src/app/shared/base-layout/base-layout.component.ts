/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Base Layout - Sprint 1
 ***/


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  //This function destroys all cookie sessions to allow the user to sign out. It then navigates them to the sign in page.
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
    }
}
