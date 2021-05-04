/*
 ============================================
; Title:  contact.component.ts
; Author: Professor Krasso
; Date: 19 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: contact page ts file
;===========================================
 */

// The Contact component provides contact information for customers to get in touch with Bob's Computer Repair Shop.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
