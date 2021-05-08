/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: API - Sprint 3
 ***/

// file import
/* This component displays a confirmation to the user that their order was completed*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../shared/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-confirmation',
  templateUrl: './invoice-confirmation.component.html',
  styleUrls: ['./invoice-confirmation.component.css']
})
export class InvoiceConfirmationComponent implements OnInit {
  invoice: Invoice

  //this is the declared variable for the invoice dialog
  constructor(private dialogRef: MatDialogRef<InvoiceConfirmationComponent>, @Inject(MAT_DIALOG_DATA) data){
    this.invoice = data.invoice;
  }

  ngOnInit(): void {
  }

}
