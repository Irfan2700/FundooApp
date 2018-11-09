import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashMoreOptionComponent } from './trash-more-option.component';

describe('TrashMoreOptionComponent', () => {
  let component: TrashMoreOptionComponent;
  let fixture: ComponentFixture<TrashMoreOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashMoreOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashMoreOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
