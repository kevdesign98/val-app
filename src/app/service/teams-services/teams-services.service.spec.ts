import { TestBed } from '@angular/core/testing';

import { TeamsServicesService } from './teams-services.service';

describe('TeamsServicesService', () => {
  let service: TeamsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
