import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GoogleAuthService} from "./auth-module/services/google-auth.service";
import {FacebookAuthService} from "./auth-module/services/facebook-auth.service";
import {CustomAuthService} from "./auth-module/services/custom-auth.service";
import {LoginFormComponent} from "./auth-module/login-form/login-form.component";
// import { SharedComponent } from './shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent

    // AuthModuleComponent
    // SharedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GoogleAuthService,FacebookAuthService, CustomAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
