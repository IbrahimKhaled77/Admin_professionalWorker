import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryDilogComponent } from './create-category-dilog.component';

describe('CreateCategoryDilogComponent', () => {
  let component: CreateCategoryDilogComponent;
  let fixture: ComponentFixture<CreateCategoryDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryDilogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
