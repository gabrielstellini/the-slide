import { Injectable } from '@angular/core';

@Injectable()
export class CustomAuthService {
  constructor() { }

    attemptLogin(username, password){
        //TODO: implement user search and verify user exists
        //TODO: if not, show an error
    }

    register(username, email,password){
      debugger;
      this.incrementLastUserID();
      this.saveUser(this.getLastUserID(),username,email,password);
    }

    login(username, password){

    }

  saveUser(id, username, email, password){

    var date = new Date();
    var dateNow = date.getTime();

    var JSONUser = {
      'username': username,
      'email': email,
      'password': password,
      'score': 0,
      'date': dateNow
    };
    localStorage.setItem(id, JSON.stringify(JSONUser));
  }

  getLastUserID() {
    var retrievedObject = localStorage.getItem('lastID');

    if (retrievedObject === null) {
      localStorage.setItem("lastID", "0");
      return 0;
    }
    //else
    return parseInt(retrievedObject);
  }

  incrementLastUserID(){
    let currIDString = this.getLastUserID();

    if (currIDString === null) {
      localStorage.setItem("lastID", "0");
    }
    else {
      let currID = currIDString;
      currID++;
      localStorage.setItem("lastID", currID.toString());
    }
  }

  getUser(id){
    let userData = JSON.parse(localStorage.getItem(id));
    let user:any;

    user.iD = id;
    user.score = userData.score;
    user.lastLogin = userData.date;
    user.email = userData.email;
    user.password = userData.password;

    return user;
  }

  setCurrentUser(id){
    localStorage.setItem("currentUser", id);
  }

  getCurrentUser(){
    var retrievedObject = localStorage.getItem("currentUser");
    return parseInt(retrievedObject);
  }
}
