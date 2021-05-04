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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//This service provides a connection for the API
export class InvoiceService {
  constructor(private http: HttpClient) { }

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

  //Gets the purchases from invoices api
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }

}
