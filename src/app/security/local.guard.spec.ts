import { TestBed } from '@angular/core/testing';

import { LocalGuard } from './local.guard';

describe('LocalGuard', () => {
  let guard: LocalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
