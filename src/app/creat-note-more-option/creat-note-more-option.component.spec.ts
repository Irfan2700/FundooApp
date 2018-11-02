import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatNoteMoreOptionComponent } from './creat-note-more-option.component';

describe('CreatNoteMoreOptionComponent', () => {
  let component: CreatNoteMoreOptionComponent;
  let fixture: ComponentFixture<CreatNoteMoreOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatNoteMoreOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatNoteMoreOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
