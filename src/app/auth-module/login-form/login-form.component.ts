import { Component, OnInit } from '@angular/core';
import {CustomAuthService} from "../services/custom-auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})



export class LoginFormComponent implements OnInit {

  constructor(
      private customAuthService: CustomAuthService
  ) { }

  ngOnInit() {
  }

  manualLogin(loginDetails){
    let email = loginDetails.email;
    let password = loginDetails.password;

    this.customAuthService.attemptLogin(email,password);

  }

  googleLogin(){

  }

  facebookLogin(){

  }

}
