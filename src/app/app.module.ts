import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {EqualValidator} from "./auth-module/register-form/equal-validator";
import {authRoutes} from "./auth-module/auth.routes";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth-module/auth-module";
import {SharedModule} from "./shared/shared.module";
import { InstructionsComponent } from './home-module/instructions/instructions.component';
import { HomeComponent } from './home/home.component';
import { HomeModuleComponent } from './home-module/home-module.component';

@NgModule({
    declarations: [
        AppComponent,
        InstructionsComponent,
        HomeComponent,
        HomeModuleComponent
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
