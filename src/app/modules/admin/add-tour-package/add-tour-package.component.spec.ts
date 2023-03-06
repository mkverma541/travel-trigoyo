import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourPackageComponent } from './add-tour-package.component';

describe('AddTourPackageComponent', () => {
  let component: AddTourPackageComponent;
  let fixture: ComponentFixture<AddTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
