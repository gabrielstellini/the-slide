import { Component, OnInit } from '@angular/core';
import {CustomAuthService} from "../services/custom-auth.service";
import {GoogleAuthService} from "../services/google-auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})



export class LoginFormComponent implements OnInit {



  constructor(
      private customAuthService: CustomAuthService,
      private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
  }



  manualLogin(loginDetails){
    let email = loginDetails.email;
    let password = loginDetails.password;

    this.customAuthService.attemptLogin(email,password);

  }

  googleLogin(){
    this.googleAuthService.login();
  }

  facebookLogin(){

  }

}
