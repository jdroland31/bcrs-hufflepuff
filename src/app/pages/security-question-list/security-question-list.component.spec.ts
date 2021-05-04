/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: Security Question List spec file - Sprint 1
***/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionListComponent } from './security-question-list.component';

describe('SecurityQuestionListComponent', () => {
  let component: SecurityQuestionListComponent;
  let fixture: ComponentFixture<SecurityQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
