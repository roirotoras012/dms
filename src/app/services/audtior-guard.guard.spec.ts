import { TestBed } from '@angular/core/testing';

import { AudtiorGuardGuard } from './audtior-guard.guard';

describe('AudtiorGuardGuard', () => {
  let guard: AudtiorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AudtiorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
