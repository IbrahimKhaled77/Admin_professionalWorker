import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryDaillogComponent } from './view-category-daillog.component';

describe('ViewCategoryDaillogComponent', () => {
  let component: ViewCategoryDaillogComponent;
  let fixture: ComponentFixture<ViewCategoryDaillogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCategoryDaillogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategoryDaillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
