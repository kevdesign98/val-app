import { TestBed } from '@angular/core/testing';

import { ListResultsService } from './list-results.service';

describe('ListResultsService', () => {
  let service: ListResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
