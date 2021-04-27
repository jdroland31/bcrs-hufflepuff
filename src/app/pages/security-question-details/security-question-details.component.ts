/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question Details - Sprint 1
 ***/

// This component displays the text for a particular security question to allow it to be edited.

/* file import*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import { SecurityQuestionService } from 'src/app/shared/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})

export class SecurityQuestionDetailsComponent implements OnInit {

  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

   constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {

    this.questionId = this.route.snapshot.paramMap.get('questionId');

    // Find SQ by Id
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
          this.question = res['data'];
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.form.controls.text.setValue(this.question.text);
        }
      );
  }

  // init function validates form fields
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

// update SQ function
  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;
    //call the security question service to up date the security question text.
    this.securityQuestionService.updateSecurityQuestion( this.questionId, updatedSecurityQuestion ).subscribe(result => {
        this.router.navigate(['/security-questions']);
      });
  }

  //cancel button
  cancel() {
    //Go back to the security questions component.
    this.router.navigate(['/security-questions']);
  }
}

