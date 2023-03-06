import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackagesDestinationsComponent } from './tour-packages-destinations.component';

describe('TourPackagesDestinationsComponent', () => {
  let component: TourPackagesDestinationsComponent;
  let fixture: ComponentFixture<TourPackagesDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPackagesDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackagesDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
