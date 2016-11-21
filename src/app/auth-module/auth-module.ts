import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {FormsModule} from "@angular/forms";
import {CustomAuthService} from "./services/custom-auth.service";
import {FacebookAuthService} from "./services/facebook-auth.service";
import {GoogleAuthService} from "./services/google-auth.service";
import {RouterModule} from "@angular/router";
import {authRoutes} from "./auth.routes";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(authRoutes)
    ],
    providers: [
        CustomAuthService,
        FacebookAuthService,
        GoogleAuthService,
    ]
})
export class AuthModule { }
