import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionsListComponent } from './security-questions-list.component';

describe('SecurityQuestionsListComponent', () => {
  let component: SecurityQuestionsListComponent;
  let fixture: ComponentFixture<SecurityQuestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
