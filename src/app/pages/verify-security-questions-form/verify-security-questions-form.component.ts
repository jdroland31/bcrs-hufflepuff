 /***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 25 2021
** Description: Verify Security Questions Form - Sprint 2
 ***/


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {

  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    //This is the FindSelectedSecurityQuestions functionality. It queries the user's object to get their stored security questions and answers.
    this.http.get('/api/users' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;
      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    })

   }

  ngOnInit() {
    this.form = this.fb.group({
      //Answers to all three questions must be provided.
      answerToSecurityQuestion1: [null,Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null,Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null,Validators.compose([Validators.required])]
    })
  }
  //This function compares the user's provided answers to the ones stored in their profile.
  verifySecurityQuestions() {
    //Get the security questions provided in the form.
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);
    //The verify security questions API is called with the provided information.
    this.http.post('/api/session/verify/users'+this.username+'/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe(res => {
      console.log(res);
      //If the API verifies the user, navigate the user to the password reset component, passing authentication and username as parameters without changing the displayed URL.
      if(res['message'] === 'success') {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true})
      } else {
        //Otherwise log failure.
        console.log('Unable to verify security question answers');
      }
    })

  }

}
