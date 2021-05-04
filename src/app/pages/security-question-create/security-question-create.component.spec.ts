/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question Create spec file - Sprint 1
 ***/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionCreateComponent } from './security-question-create.component';

describe('SecurityQuestionCreateComponent', () => {
  let component: SecurityQuestionCreateComponent;
  let fixture: ComponentFixture<SecurityQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
