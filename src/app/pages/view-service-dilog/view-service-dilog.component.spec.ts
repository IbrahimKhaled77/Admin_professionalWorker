import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceDilogComponent } from './view-service-dilog.component';

describe('ViewServiceDilogComponent', () => {
  let component: ViewServiceDilogComponent;
  let fixture: ComponentFixture<ViewServiceDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServiceDilogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServiceDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
