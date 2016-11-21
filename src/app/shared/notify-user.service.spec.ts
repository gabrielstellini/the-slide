/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotifyUserService } from './notify-user.service';

describe('NotifyUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifyUserService]
    });
  });

  it('should ...', inject([NotifyUserService], (service: NotifyUserService) => {
    expect(service).toBeTruthy();
  }));
});
