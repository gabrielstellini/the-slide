import {Component, OnInit} from '@angular/core';
import {NotifyService} from "../../api/notify.service";
import {NotificationData, NotificationTypes} from "./notification.model";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']

})

export class NotificationComponent implements OnInit {

    message: string;
    isHidden: boolean = true;

    isInfo: boolean = false;
    isDanger: boolean = false;
    isSuccess: boolean = false;

    constructor(private notifyService: NotifyService) { }

    ngOnInit() {
        this.notifyService.subscribe(this);
    }

    showNotification(notificationDetails: NotificationData) {

        this.message = notificationDetails.message;
        this.setMessageType(notificationDetails.type);
        this.notifyService.subscribe(this);
        this.isHidden = false;
        this.fade();
    }

    setMessageType(messageType:NotificationTypes){
        this.isInfo = false;
        this.isDanger = false;
        this.isSuccess = false;

        if(messageType === 0){
            //info
            this.isInfo = true;
        }
        else if(messageType === 1){
            //danger
            this.isDanger = true;
        }
        else if(messageType === 2){
            //success
            this.isSuccess = true;
        }
    }

    fade() {
        window.setTimeout(() => this.isHidden = true, 3000);
    }
}
