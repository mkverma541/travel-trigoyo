import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsAddComponent } from './destinations-add.component';

describe('DestinationsAddComponent', () => {
  let component: DestinationsAddComponent;
  let fixture: ComponentFixture<DestinationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
