
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  securityQuestions: any;
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.http.get('/api/security-questions').subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      contactInformation: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)
      }),
      securityQuestions: new FormGroup({
        securityQuestion1: new FormControl(null, Validators.required),
        securityQuestion2: new FormControl(null, Validators.required),
        securityQuestion3: new FormControl(null, Validators.required),
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)
      }),
      credentials: new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
        ])
      }),
    });
    console.log(this.registrationForm)
  }
  register(form) {
    const contactInformation = form.contactInformation;
    const securityQuestions = form.securityQuestions;
    const credentials = form.credentials;

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      },
    ];
    console.log(selectedSecurityQuestions)

    this.http.post('/api/session/register', {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {
      debugger;
      if (res['data']) { // user is authenticated and we grant them access
        this.cookieService.set('sessionUser', credentials.userName, 1);
        this.router.navigate(['/']);
      } else {
        // user is not authenticated and we return error msg
        this.errorMessage = res['message'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    })
  }
}
