import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProblemDaillogComponent } from './view-problem-daillog.component';

describe('ViewProblemDaillogComponent', () => {
  let component: ViewProblemDaillogComponent;
  let fixture: ComponentFixture<ViewProblemDaillogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProblemDaillogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProblemDaillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
