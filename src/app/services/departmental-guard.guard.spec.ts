import { TestBed } from '@angular/core/testing';

import { DepartmentalGuardGuard } from './departmental-guard.guard';

describe('DepartmentalGuardGuard', () => {
  let guard: DepartmentalGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DepartmentalGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
