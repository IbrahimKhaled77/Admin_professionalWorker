import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDaillogComponent } from './view-user-daillog.component';

describe('ViewUserDaillogComponent', () => {
  let component: ViewUserDaillogComponent;
  let fixture: ComponentFixture<ViewUserDaillogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserDaillogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserDaillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
