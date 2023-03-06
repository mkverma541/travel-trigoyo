import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsPostCategoriesComponent } from './blogs-post-categories.component';

describe('BlogsPostCategoriesComponent', () => {
  let component: BlogsPostCategoriesComponent;
  let fixture: ComponentFixture<BlogsPostCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsPostCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsPostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
