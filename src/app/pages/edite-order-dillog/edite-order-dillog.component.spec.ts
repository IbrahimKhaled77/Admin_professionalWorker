import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeOrderDillogComponent } from './edite-order-dillog.component';

describe('EditeOrderDillogComponent', () => {
  let component: EditeOrderDillogComponent;
  let fixture: ComponentFixture<EditeOrderDillogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeOrderDillogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeOrderDillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
