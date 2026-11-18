import { TestBed } from '@angular/core/testing';

import { TacticalService } from './tactical.service';

describe('TacticalService', () => {
  let service: TacticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
