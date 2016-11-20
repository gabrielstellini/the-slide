/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacebookAuthService } from './facebook-auth.service';

describe('FacebookAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookAuthService]
    });
  });

  it('should ...', inject([FacebookAuthService], (service: FacebookAuthService) => {
    expect(service).toBeTruthy();
  }));
});
