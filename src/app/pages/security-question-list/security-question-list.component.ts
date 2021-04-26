/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question List - Sprint 1
***/

import { Component, OnInit } from '@angular/core';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';


@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    //Call the security questions service to get all security questions and set securityQuestions to this value.
    this.securityQuestionService.findAllSecurityQuestion().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
   }

  ngOnInit() {
  }
  //This function populates a dialog with the DeleteRecordDialogComponent and allows the user to call to the API to delete a specified security question.
  delete (recordId: string){
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: "Delete Record Dialog",
        dialogBody: `Are you sure you want to delete security question ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm'){
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res=> {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !==recordId);
        })
      }
    }

    )
  }
}
