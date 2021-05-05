/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Home - Sprint 1
 ***/

// The home component provide a form with services available.
import { ServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';
import { InvoiceSummaryDialogComponent } from 'src/app/dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { InvoiceConfirmationComponent } from 'src/app/dialogs/invoice-confirmation/invoice-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { ServiceRepairService } from '../../shared/services/service-repair.service';
import { LineItem } from '../../shared/interfaces/line-item.interface';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;

  services: ServiceRepairItem[];
  lineItems: LineItem[];

  constructor(private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog, private router: Router, private serviceRepairService: ServiceRepairService,
    private invoiceService: InvoiceService)
    { // get username
      this.userName = this.cookieService.get('session_user');
      //get services
      this.services = this.serviceRepairService.getServiceRepairItems();
      console.log(this.services);
    }

  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])]
    });
    console.log(this.form);
  }
  //Handles form submission to gather data and present user with invoice summary dialogue.
  submit(form) {
    console.log('service submit!');
    console.log(form);
    //Get the selected services.
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push({
          id: key
        });
      }
    }
    this.lineItems = [];
    //Use the selected service id's to push the title and value to the lineItems array.
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }

    console.log(this.lineItems);
    //Get the parts and labor amounts and calculate all subtotals and totals.
    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = this.lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;
    //Create and Invoice object from the available data.
    const invoice = {
      userName: this.userName,
      lineItems: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);
    //Open an invoice summary dialogue and pass in the created invoice object.
    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });
    //If the user closes the dialogue having selected 'confirm', call the invoice service and create a new invoice.
    dialogRef.afterClosed().subscribe(result =>
      {
      if (result === 'confirm') {
        console.log('invoice saved');
        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
          console.log(res);
          //Open an invoice confirmation and pass in the created invoice object.
          const confirmationRef = this.dialog.open(InvoiceConfirmationComponent, {
            data: {
              invoice: invoice
            },
            disableClose: true,
            width: '800px'
          });
          confirmationRef.afterClosed().subscribe(r =>
            {
              if (r === 'confirm') {
                console.log('confirmed');
                this.router.navigate(['/']);
              }
            }, err => {
              console.log(err);
          });
        }, err => {
          //If an error is encountered, log it to the console.
          console.log(err);
        });
      }
    });
  }
}
