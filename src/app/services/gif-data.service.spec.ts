import { TestBed } from '@angular/core/testing';

import { GifDataService } from './gif-data.service';

describe('GifDataService', () => {
  let service: GifDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
