import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiditeServiceDilogComponentComponent } from './eidite-service-dilog-component.component';

describe('EiditeServiceDilogComponentComponent', () => {
  let component: EiditeServiceDilogComponentComponent;
  let fixture: ComponentFixture<EiditeServiceDilogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EiditeServiceDilogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EiditeServiceDilogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
