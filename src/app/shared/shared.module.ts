import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppStateService} from "./app-state.service";
import {NotifyUserService} from "./notify-user.service";


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AppStateService,
        NotifyUserService
    ],
    declarations: []
})
export class SharedModule { }
