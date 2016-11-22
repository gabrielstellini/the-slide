import { Component, OnInit } from '@angular/core';
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
  demo:string;

  /**
   * Types of alerts:
   * info, warning, danger
   *
   * It is recommended for message to have <strong> and <em> tags within it
   *
   * @param notifyService
   * @param notificationDetails
   */

  constructor( private notifyService : NotifyService) {

  }

  ngOnInit() {
    this.notifyService.subscribe(this);
  }

  showNotification(notificationDetails: NotificationData){
    this.message = notificationDetails.message;
    // this.type = notificationDetails.type.toString().toLowerCase();
    // this.demo = notificationDetails.type.valueOf();
    this.type = NotificationTypes[notificationDetails.type];
    this.type = this.type.toLowerCase();
    this.notifyService.subscribe(this);
  }



}
