import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {

  public isLoggedIn: boolean = false;

  constructor() { }
}
