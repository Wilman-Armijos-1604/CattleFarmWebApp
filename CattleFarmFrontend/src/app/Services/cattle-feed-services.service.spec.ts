import { TestBed } from '@angular/core/testing';

import { CattleFeedServicesService } from './cattle-feed-services.service';

describe('CattleFeedServicesService', () => {
  let service: CattleFeedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleFeedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
