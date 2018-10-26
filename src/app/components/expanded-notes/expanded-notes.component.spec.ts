import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedNotesComponent } from './expanded-notes.component';

describe('ExpandedNotesComponent', () => {
  let component: ExpandedNotesComponent;
  let fixture: ComponentFixture<ExpandedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
