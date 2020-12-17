import { TestBed } from '@angular/core/testing';

import { TgChartsService } from './tg-charts.service';

describe('TgChartsService', () => {
  let service: TgChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
