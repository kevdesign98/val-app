import { TestBed } from '@angular/core/testing';

import { ListSchedulesService } from './list-schedules.service';

describe('ListSchedulesService', () => {
  let service: ListSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
