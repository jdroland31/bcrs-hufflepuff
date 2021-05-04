/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Delete Record Dialog - Sprint 1
 ***/

//This component loads a single record's information for display so a user can choose to delete it.

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css']
})
export class DeleteRecordDialogComponent implements OnInit {
    recordId: string;
    dialogHeader: string;
    dialogBody: string;

  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) data)
  {
    this.recordId = data.recordId;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit() {
  }

}
