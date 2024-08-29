import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceDilogComponentComponent } from './create-service-dilog-component.component';

describe('CreateServiceDilogComponentComponent', () => {
  let component: CreateServiceDilogComponentComponent;
  let fixture: ComponentFixture<CreateServiceDilogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceDilogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceDilogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
