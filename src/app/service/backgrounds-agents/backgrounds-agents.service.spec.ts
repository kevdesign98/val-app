import { TestBed } from '@angular/core/testing';

import { BackgroundsAgentsService } from './backgrounds-agents.service';
describe('BackgroundsAgentsService', () => {
  let service: BackgroundsAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundsAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
