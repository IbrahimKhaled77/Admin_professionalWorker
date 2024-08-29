import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDaillogComponent } from './view-order-daillog.component';

describe('ViewOrderDaillogComponent', () => {
  let component: ViewOrderDaillogComponent;
  let fixture: ComponentFixture<ViewOrderDaillogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderDaillogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderDaillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
