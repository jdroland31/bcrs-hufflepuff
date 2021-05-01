/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 25 2021
** Description: Reset Password Form - Sprint 2
 ***/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    //Get the authentication and username params.
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
  }

  ngOnInit(): void {
    this.form = this.fb.group({

      //Apply password requirements to the form validation.
      password: [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')]
        )]

    });
  }
//This function allows the user to change their password to the one they provided.
  resetPassword() {
    this.http.post('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      // User is authenticated and can be granted access
      this.cookieService.set('sessionuser', this.username, 1);
      //Navigate to the home page.
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}
