import { TestBed } from '@angular/core/testing';

import { TelefoniaService } from './telefonia.service';

describe('TelefoniaService', () => {
  let service: TelefoniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelefoniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
