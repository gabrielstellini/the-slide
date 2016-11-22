import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {LoginFormComponent} from "./auth-module/login-form/login-form.component";
import {RegisterFormComponent} from "./auth-module/register-form/register-form.component";
import {EqualValidator} from "./auth-module/register-form/equal-validator";
import {authRoutes} from "./auth-module/auth.routes";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth-module/auth-module";
import {SharedModule} from "./shared/shared.module";
// import { SharedComponent } from './shared/shared.component';

@NgModule({
    declarations: [
        AppComponent,
        EqualValidator
    ],
    imports: [
        AuthModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule.forRoot(authRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
