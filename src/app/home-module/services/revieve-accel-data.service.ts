import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class RevieveAccelDataService {

    public coordinates;

    constructor(private http: Http) {
        this.getData();
    }


    getData(){
        this.http.get('http://localhost/api/accelerometer_request.php').subscribe(res => {this.setCoordinates(res.json())});
        return this.coordinates;
    }

    setCoordinates(data){
        this.coordinates = data;
    }
}

