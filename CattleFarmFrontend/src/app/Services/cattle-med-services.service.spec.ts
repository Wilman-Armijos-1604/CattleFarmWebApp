import { TestBed } from '@angular/core/testing';

import { CattleMedServicesService } from './cattle-med-services.service';

describe('CattleMedServicesService', () => {
  let service: CattleMedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleMedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
