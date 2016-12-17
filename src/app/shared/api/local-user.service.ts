import { Injectable } from '@angular/core';
import {User} from "../User";

@Injectable()
export class LocalUserService {

    saveUser(id, username, email, password, score){

        let date = new Date();
        let dateNow = date.getTime();

        let JSONUser = {
            'username': username,
            'email': email,
            'password': password,
            'score': score,
            'date': dateNow
        };
        localStorage.setItem(id, JSON.stringify(JSONUser));
    }

     getLastUserID() {
        let retrievedObject = localStorage.getItem('lastID');

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

    getUser(id:string):User{
        let userData = JSON.parse(localStorage.getItem(id));
        let user = <User>{};

        user.ID = Number(id);
        user.score = userData.score;
        user.lastLogin = userData.date;
        user.email = userData.email;
        user.password = userData.password;
        user.username = userData.username;

        return user;
    }

    getUserByName(name:String):User{
        for(let i = 0;i<this.getLastUserID();i++) {
            let userData = JSON.parse(localStorage.getItem(i.toString()));
            let user = <User>{};

            if(userData.name === name)
            user.ID = Number(i);
            user.score = userData.score;
            user.lastLogin = userData.date;
            user.email = userData.email;
            user.password = userData.password;
            user.username = userData.username;

            return user;
        }
        return null;
    }

    setScore(score:number){
        let user = this.getUser(this.getCurrentUser().toString());
        this.saveUser(user.ID,user.username,user.email,user.password,score);
    }

    setCurrentUser(id){
        localStorage.setItem("currentUser", id);
    }


    public getCurrentUser(){
        let retrievedObject = localStorage.getItem("currentUser");
        return parseInt(retrievedObject);
    }
}
