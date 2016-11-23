import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/User";
import {NotifyService} from "../../shared/api/notify.service";
import {NotificationData, NotificationTypes} from "../../shared/notification/notification/notification.model";

@Injectable()
export class CustomAuthService{

    constructor(
        private http: Http,
        private notifyService: NotifyService
    ) { }

    attemptLogin(email, password){

        let iterations = this.getLastUserID();

        for (var i = 0; i < iterations; i++) {
            let user = this.getUser(i);
            if (user.email === email) {
                if (user.password !== password) {
                    this.notifyService.notify(<NotificationData> {
                        message: "Incorrect credentials",
                        type: NotificationTypes.DANGER
                    });

                } else {
                    this.login(user);
                    // return("success", "Welcome back :)");
                    this.notifyService.notify(<NotificationData> {
                        message: "Welcome back :)",
                        type: NotificationTypes.SUCCESS
                    })
                }
            } else {
                this.notifyService.notify(<NotificationData> {
                    message: "Credentials not found",
                    type: NotificationTypes.DANGER
                })
            }
        }
    }

    login(user: User) {
        this.setCurrentUser(user.ID);
        return this.http.post(environment.BASE_URL + 'game',
            {
                // userData : user
                userData: JSON.stringify(user)
            }
        ).subscribe();
    }


    register(username, email,password){
        this.saveUser(this.getLastUserID(),username,email,password);
        this.incrementLastUserID();
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
        let user = <User>{};

        user.ID = id ;
        user.score = userData.score;
        user.lastLogin = userData.date;
        user.email = userData.email;
        user.password = userData.password;
        user.username = userData.username;

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
