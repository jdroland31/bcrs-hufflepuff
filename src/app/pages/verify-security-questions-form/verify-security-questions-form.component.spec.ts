 /***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 25 2021
** Description: Verify Security Questions Form spec file - Sprint 2
 ***/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecurityQuestionsFormComponent } from './verify-security-questions-form.component';

describe('VerifySecurityQuestionsFormComponent', () => {
  let component: VerifySecurityQuestionsFormComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySecurityQuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
