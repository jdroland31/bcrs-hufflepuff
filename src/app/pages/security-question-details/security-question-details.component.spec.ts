/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question Details spec file - Sprint 1
 ***/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionDetailsComponent } from './security-question-details.component';

describe('SecurityQuestionDetailsComponent', () => {
  let component: SecurityQuestionDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
