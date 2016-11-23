import { Component, OnInit } from '@angular/core';
import {CustomAuthService} from "../services/custom-auth.service";
import {GoogleAuthService} from "../services/google-auth.service";
import {NotifyService} from "../../shared/api/notify.service";
import {NotificationTypes, NotificationData} from "../../shared/notification/notification/notification.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})



export class LoginFormComponent implements OnInit {

  constructor(
      private customAuthService: CustomAuthService,
      private googleAuthService: GoogleAuthService,
      private notificationService:NotifyService
  ) { }

  ngOnInit() {
  }

  manualLogin(loginDetails){

    let email = loginDetails.value.email;
    let password = loginDetails.value.password;

    this.customAuthService.attemptLogin(email,password);
  }

  googleLogin(){
    this.googleAuthService.login();
  }

  facebookLogin(){

  }

}
