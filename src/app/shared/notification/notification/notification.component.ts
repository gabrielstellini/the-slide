import {Component, OnInit, style, animate, transition, trigger} from '@angular/core';
import {NotifyService} from "../../api/notify.service";
import {NotificationData, NotificationTypes} from "./notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']

})

export class NotificationComponent implements OnInit {

  message: string;
  type: string;
  toggleHidden: boolean = true;

  constructor(private notifyService: NotifyService) {}

  ngOnInit() {
    this.notifyService.subscribe(this);
  }

  showNotification(notificationDetails: NotificationData) {

    this.message = notificationDetails.message;
    this.type = NotificationTypes[notificationDetails.type];
    this.type = this.type.toLowerCase();
    this.notifyService.subscribe(this);
    this.toggleHidden = false;
    this.fade();
  }

  fade() {
    window.setTimeout(() => this.toggleHidden = true, 2000);
  }
}
