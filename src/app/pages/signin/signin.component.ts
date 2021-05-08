/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Sign In - Sprint 1
 ***/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar) { }

  signinForm: FormGroup;
  errorMessage: string;

  ngOnInit(): void {
    //Form validation
    this.signinForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  signin(){
    //Get the username and password from the form.
    const userName = this.signinForm.controls['userName'].value;
    const password = this.signinForm.controls['password'].value;
    this.http.post('/api/session/signin',{'userName': userName,'password': password}).subscribe(res => {
      console.log(res);
      if(res['data'])//If the result returns an attribute named 'data' we can set the user's session cookie and navigate to the home route.
      {
        this.cookieService.set('session_user', userName, 1);
        this.router.navigate(['/']);
      }
      else if(!(res['data']) && (res['httpCode'] === '401')) //If we do not get user data but return a 200 code, we have an invalid ID and should alert the user.
      {
        this.openSnackBar('Invalid username or password, please try again', 'WARNING');
      }
      else{//A result which returns an error is displayed.
        this.openSnackBar(res['message'], 'ERROR');
      }
    })
  }
//the error alert
  openSnackBar(message: string, notificationType: string) : void
  {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

}
