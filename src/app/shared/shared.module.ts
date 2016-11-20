import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FacebookAuthService} from "../auth-module/services/facebook-auth.service";
import {GoogleAuthService} from "../auth-module/services/google-auth.service";
import {CustomAuthService} from "../auth-module/services/custom-auth.service";


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        CustomAuthService,
        FacebookAuthService,
        GoogleAuthService
    ],
    declarations: []
})
export class SharedModule { }
