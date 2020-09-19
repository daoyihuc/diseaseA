import { TestBed } from '@angular/core/testing';

import { ClassSelectService } from './class-select.service';

describe('ClassSelectService', () => {
  let service: ClassSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
