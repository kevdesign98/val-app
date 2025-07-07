import { TestBed } from '@angular/core/testing';

import { MapsStratService } from './maps-strat.service';

describe('MapsStratService', () => {
  let service: MapsStratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsStratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
