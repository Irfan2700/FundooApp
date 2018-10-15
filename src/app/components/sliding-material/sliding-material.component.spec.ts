
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SlidingMaterialComponent } from './sliding-material.component';

describe('SlidingMaterialComponent', () => {
  let component: SlidingMaterialComponent;
  let fixture: ComponentFixture<SlidingMaterialComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [SlidingMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
