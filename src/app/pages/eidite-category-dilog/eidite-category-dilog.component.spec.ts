import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiditeCategoryDilogComponent } from './eidite-category-dilog.component';

describe('EiditeCategoryDilogComponent', () => {
  let component: EiditeCategoryDilogComponent;
  let fixture: ComponentFixture<EiditeCategoryDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EiditeCategoryDilogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EiditeCategoryDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
