import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/User";
import {CustomAuthService} from "../services/custom-auth.service";
import {EqualValidator} from "./equal-validator";
import {NotifyService} from "../../shared/api/notify.service";
import {NotificationData, NotificationTypes} from "../../shared/notification/notification/notification.model";
import {Form} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public user: User = <User> {};


  constructor(
      private registerAuth: CustomAuthService,
      private notificationService:NotifyService
  ) {}

  ngOnInit() {
  }

  manualRegister(registerForm:any){
    debugger;
    let userName = registerForm.value.username;
    let email = registerForm.value.email;
    let password=registerForm.value.password;

    this.registerAuth.register(userName,email,password);

    this.notificationService.notify( <NotificationData> {
      message: "Account created! :)",
      type: NotificationTypes.SUCCESS
    });

  }



}
