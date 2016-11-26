import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {authRoutes} from "./auth-module/auth.routes";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth-module/auth-module";
import {SharedModule} from "./shared/shared.module";
import { InstructionsComponent } from './home-module/instructions/instructions.component';

import { HomeModuleComponent } from './home-module/home-module.component';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import {HomeModuleModule} from "./home-module/home-module.module";
import {MobileAppModule} from "./mobile-app/mobile-app.module";
import {homeRoutes} from "./home-module/home.routes";

@NgModule({
    declarations: [
        AppComponent,
        MobileAppComponent
    ],
    imports: [
        AuthModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        HomeModuleModule,
        MobileAppModule,
        RouterModule.forRoot(authRoutes),
        RouterModule.forRoot(homeRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
