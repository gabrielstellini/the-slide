import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppStateService} from "./app-state.service";
import { NotificationComponent } from './notification/notification/notification.component';
import {NotifyService} from "./api/notify.service";


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AppStateService,
        NotifyService
    ],
    declarations: [NotificationComponent],
    exports: [NotificationComponent]
})
export class SharedModule { }
