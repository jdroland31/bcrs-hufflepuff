import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionsCreateComponent } from './security-questions-create.component';

describe('SecurityQuestionsCreateComponent', () => {
  let component: SecurityQuestionsCreateComponent;
  let fixture: ComponentFixture<SecurityQuestionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
