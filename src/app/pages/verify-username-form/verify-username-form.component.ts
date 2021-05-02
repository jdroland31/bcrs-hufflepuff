/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 23 2021
** Description: Verify Username Form - Sprint 2
 ***/
//this component is part of the password reset process - it verifies username against db before
// serving the security questions

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }
  //This function is called when the user clicks Submit.
  validateUsername() {
    //Get the username provided in the form.
    const username = this.form.controls['username'].value;
    console.log(username);
    //Call the Verify Users API.
    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      // console.log(res);
      if (res) {
        // console.log(res['data']);
        //If the response data is null, the username does not match our records.
        if(res['data'] === null)
        {
          console.log("Username does not match our records");
        }
        //If this is a verified user, continue the process by navigating to the verify security questions component and passing the username, but do not change the displayed URL.
        else{
          this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
        }
      } else {
        //If the username provided does not match records, log the error.
        console.log("Username does not match our records");
      }
    }, err => {
      //If an error occurs during the API call, log it.
      console.log(err);

    });
  }
}
