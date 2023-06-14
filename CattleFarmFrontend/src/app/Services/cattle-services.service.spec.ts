import { TestBed } from '@angular/core/testing';

import { CattleServicesService } from './cattle-services.service';

describe('CattleServicesService', () => {
  let service: CattleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
