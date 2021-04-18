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
export class SecurityQuestionService {
  // constructor
  constructor(private http: HttpClient) { }

  /** FindAll SQ **/

  findAllSecurityQuestion(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  /** FindAll SQ by ID **/


  /** Create SQ **/
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  /** Update SQ **/


  /** Delete SQ **/
  deleteSecurityQuestion(_id: string):Observable<any>{
    return this.http.delete(`/api/security-questions/${_id}`)
  }

}
