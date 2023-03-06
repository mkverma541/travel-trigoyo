import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidewarWidgetComponent } from './sidewar-widget.component';

describe('SidewarWidgetComponent', () => {
  let component: SidewarWidgetComponent;
  let fixture: ComponentFixture<SidewarWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidewarWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidewarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
