import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongirmDialogComponent } from './congirm-dialog.component';

describe('CongirmDialogComponent', () => {
  let component: CongirmDialogComponent;
  let fixture: ComponentFixture<CongirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
