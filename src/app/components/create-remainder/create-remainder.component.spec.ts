import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemainderComponent } from './create-remainder.component';

describe('CreateRemainderComponent', () => {
  let component: CreateRemainderComponent;
  let fixture: ComponentFixture<CreateRemainderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRemainderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
