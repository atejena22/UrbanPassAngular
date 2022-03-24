import { TestBed } from '@angular/core/testing';

import { UrbanizacionService } from './urbanizacion.service';

describe('UrbanizacionService', () => {
  let service: UrbanizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
