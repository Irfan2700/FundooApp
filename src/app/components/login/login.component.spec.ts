import { BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let e1: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {

    expect(component.log.email).toEqual('abc@123.xyz.com');
    expect(component.log.password).toEqual('123456789');
  });

  // it('', async(() => {

  //   fixture.detectChanges();
  //   spyOn(component, 'loginSubmit');
  //   e1 = fixture.debugElement.query(By.css('button')).nativeElement;
    
  // })

});
