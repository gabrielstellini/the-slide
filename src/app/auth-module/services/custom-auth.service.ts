import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/User";
import {NotifyService} from "../../shared/api/notify.service";
import {NotificationData, NotificationTypes} from "../../shared/notification/notification/notification.model";
import {Router} from "@angular/router";

@Injectable()
export class CustomAuthService{

    constructor(
        private http: Http,
        private notifyService: NotifyService,
        private router: Router
    ) { }

    attemptLogin(email, password){
        let iterations = CustomAuthService.getLastUserID();
        let foundUser:boolean = false;
        //No registered users
        if(iterations === 0){
            this.notifyService.notify(<NotificationData> {
                message: "Credentials not found",
                type: NotificationTypes.DANGER
            })
        }


        for (let i = 0; i < iterations; i++) {
            let user = this.getUser(i);
            if (user.email === email) {
                foundUser = true;
                if (user.password !== password) {
                    this.notifyService.notify(<NotificationData> {
                        message: "Incorrect credentials",
                        type: NotificationTypes.DANGER
                    });

                } else {
                    this.notifyService.notify(<NotificationData> {
                        message: "Welcome back :)",
                        type: NotificationTypes.SUCCESS
                    });

                    setTimeout(() => {
                        this.login(user);
                        this.router.navigate(['/home']);
                    }, 2000);
                }
            }
        }

        if(!foundUser) {
            this.notifyService.notify(<NotificationData> {
                message: "Credentials not found",
                type: NotificationTypes.DANGER
            });
        }
    }

    login(user: User) {
        CustomAuthService.setCurrentUser(user.ID);
    }

    register(username, email,password){
        this.saveUser(CustomAuthService.getLastUserID(),username,email,password);
        this.incrementLastUserID();
    }


    saveUser(id, username, email, password){

        let date = new Date();
        let dateNow = date.getTime();

        let JSONUser = {
            'username': username,
            'email': email,
            'password': password,
            'score': 0,
            'date': dateNow
        };
        localStorage.setItem(id, JSON.stringify(JSONUser));
    }

    static getLastUserID() {
        let retrievedObject = localStorage.getItem('lastID');

        if (retrievedObject === null) {
            localStorage.setItem("lastID", "0");
            return 0;
        }
        //else
        return parseInt(retrievedObject);
    }

    incrementLastUserID(){
        let currIDString = CustomAuthService.getLastUserID();

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

    static setCurrentUser(id){
        localStorage.setItem("currentUser", id);
    }
}
