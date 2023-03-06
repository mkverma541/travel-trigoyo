import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogCategoriesComponent } from './add-blog-categories.component';

describe('AddBlogCategoriesComponent', () => {
  let component: AddBlogCategoriesComponent;
  let fixture: ComponentFixture<AddBlogCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
