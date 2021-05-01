<<<<<<< HEAD
/*
 ============================================
; Title:  invoice.service.ts
; Author: Professor Krasso
; Date: 30 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: middleware between angular and node.js
; Sprint - 3
;===========================================
 */

// file import
=======
/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 30 2021
** Description: Invoice service
 ***/
//This component provides an interface for the service API

// file import

>>>>>>> f3770649a8b1479fb08c730fa9c845a37ab7ffdb
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
//This service provides a connection for the API
export class InvoiceService {
  constructor(private http: HttpClient) { }
=======
export class InvoiceService {
  constructor(private http: HttpClient) { }

>>>>>>> f3770649a8b1479fb08c730fa9c845a37ab7ffdb
  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post('/api/invoices/' + userName, {
      userName: userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    })
  }
<<<<<<< HEAD
  //Gets the purchases from invoices api
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
=======
  //
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
}
>>>>>>> f3770649a8b1479fb08c730fa9c845a37ab7ffdb
}
