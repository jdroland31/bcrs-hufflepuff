/*
 ============================================
; Title:  about.component.ts
; Author: Professor Krasso
; Date: 19 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: About component ts file - Sprint 2
;===========================================
 */

// The About component provides some information about our team.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
