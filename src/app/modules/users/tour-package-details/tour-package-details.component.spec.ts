import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackageDetailsComponent } from './tour-package-details.component';

describe('TourPackageDetailsComponent', () => {
  let component: TourPackageDetailsComponent;
  let fixture: ComponentFixture<TourPackageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPackageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
