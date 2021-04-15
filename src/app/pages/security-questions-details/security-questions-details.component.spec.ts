import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionsDetailsComponent } from './security-questions-details.component';

describe('SecurityQuestionsDetailsComponent', () => {
  let component: SecurityQuestionsDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
