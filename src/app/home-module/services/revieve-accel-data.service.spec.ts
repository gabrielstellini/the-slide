/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RevieveAccelDataService } from './revieve-accel-data.service';

describe('RevieveAccelDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevieveAccelDataService]
    });
  });

  it('should ...', inject([RevieveAccelDataService], (service: RevieveAccelDataService) => {
    expect(service).toBeTruthy();
  }));
});
