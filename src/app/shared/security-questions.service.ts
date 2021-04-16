/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

// import files
import { SecurityQuestion } from './security-question.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionsService {
  // constructor
  constructor(private http: HttpClient) { }

  /** FindAll SQ **/


  /** FindAll SQ by ID **/


  /** Create SQ **/
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.post('/api/security-questions', {
      text: updatedSecurityQuestions.text
    })
  }

  /** Update SQ **/


  /** Delete SQ **/


}
