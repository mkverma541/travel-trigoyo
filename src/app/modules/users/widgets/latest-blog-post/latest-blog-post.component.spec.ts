import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBlogPostComponent } from './latest-blog-post.component';

describe('LatestBlogPostComponent', () => {
  let component: LatestBlogPostComponent;
  let fixture: ComponentFixture<LatestBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
