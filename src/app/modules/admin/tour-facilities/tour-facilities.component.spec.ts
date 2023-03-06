import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourFacilitiesComponent } from './tour-facilities.component';

describe('TourFacilitiesComponent', () => {
  let component: TourFacilitiesComponent;
  let fixture: ComponentFixture<TourFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
