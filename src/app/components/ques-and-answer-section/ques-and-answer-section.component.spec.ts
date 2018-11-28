import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesAndAnswerSectionComponent } from './ques-and-answer-section.component';

describe('QuesAndAnswerSectionComponent', () => {
  let component: QuesAndAnswerSectionComponent;
  let fixture: ComponentFixture<QuesAndAnswerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesAndAnswerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesAndAnswerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
