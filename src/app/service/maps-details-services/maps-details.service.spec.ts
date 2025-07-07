import { TestBed } from '@angular/core/testing';

import { MapsDetailsService } from './maps-details.service';

describe('MapsDetailsService', () => {
  let service: MapsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
