/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: API - Sprint 3
 ***/

// file import
/* This component displays a summary of the user selected items along with totals*/
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../shared/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})

export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: Invoice
  //declaration of variables for the invoice summary dialog
  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data){
    this.invoice = data.invoice;
  }

  ngOnInit() {
  }

}
