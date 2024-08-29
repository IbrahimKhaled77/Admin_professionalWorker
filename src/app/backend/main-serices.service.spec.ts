import { TestBed } from '@angular/core/testing';

import { MainSericesService } from './main-serices.service';

describe('MainSericesService', () => {
  let service: MainSericesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSericesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
