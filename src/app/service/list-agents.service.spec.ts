import { TestBed } from '@angular/core/testing';

import { ListAgentsService } from './list-agents.service';

describe('ListAgentsService', () => {
  let service: ListAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
