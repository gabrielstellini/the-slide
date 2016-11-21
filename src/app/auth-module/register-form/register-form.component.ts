import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/User";
import {CustomAuthService} from "../services/custom-auth.service";
import {EqualValidator} from "./equal-validator";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public user: User = <User> {};


  constructor(private registerAuth: CustomAuthService) {

  }

  ngOnInit() {
  }

  manualRegister(registerForm){

    console.log("here")

    let userName = registerForm.username;
    let email = registerForm.email;
    let password=registerForm.password;

    this.registerAuth.register(userName,email,password);
  }



}
