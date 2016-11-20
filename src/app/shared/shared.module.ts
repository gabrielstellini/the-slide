import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./api/CustomAuthService";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      AuthService
  ],
  declarations: []
})
export class SharedModule { }
