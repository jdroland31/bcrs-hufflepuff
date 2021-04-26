/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question Create - Sprint 1
 ***/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from '../../shared/security-question.service';
import { SecurityQuestion } from '../../shared/security-question.interface';


@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }
//Create a new security question from the provided text.
create ()
{
  const newSecurityQuestion = {} as SecurityQuestion;
  newSecurityQuestion.text = this.form.controls.text.value;

  this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
    this.router.navigate(['/security-questions']);
  }, err =>{
      console.log(err);
    })
}
//Exit the create menu and navigate back to security questions.
cancel(){
  this.router.navigate(['/security-questions']);
}
}
