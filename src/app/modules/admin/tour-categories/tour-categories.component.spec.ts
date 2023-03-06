import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCategoriesComponent } from './tour-categories.component';

describe('TourCategoriesComponent', () => {
  let component: TourCategoriesComponent;
  let fixture: ComponentFixture<TourCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
