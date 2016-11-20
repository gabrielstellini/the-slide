/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomAuthService } from './custom-auth.service';

describe('CustomAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomAuthService]
    });
  });

  it('should ...', inject([CustomAuthService], (service: CustomAuthService) => {
    expect(service).toBeTruthy();
  }));
});
