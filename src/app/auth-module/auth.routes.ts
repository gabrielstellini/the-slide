import {Routes, RouterModule} from "@angular/router";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {ModuleWithProviders} from "@angular/core";

export const authRoutes : Routes = [
    {path: '*',component:LoginFormComponent},
    {path: 'login',component:LoginFormComponent},
    {path: 'register', component:RegisterFormComponent}
];