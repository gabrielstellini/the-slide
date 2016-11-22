import { Injectable } from '@angular/core';
import {NotificationComponent} from "../notification/notification/notification.component";
import any = jasmine.any;
import {NotificationData} from "../notification/notification/notification.model";


@Injectable()
export class NotifyService {
    private notificationComponent:NotificationComponent;

    notify(notificationData: NotificationData){
        this.notificationComponent.showNotification(notificationData);

    }

    subscribe(component: NotificationComponent){
        this.notificationComponent = component;
    }
}
