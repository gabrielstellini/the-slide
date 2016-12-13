import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";



interface Coordinates {
    x: number,
    y: number,
    z: number
}

@Injectable()
export class RevieveAccelDataService {

    constructor(private http: Http) { }


    getData(): Observable<Coordinates>{
        return this.http.get('http://localhost/api/accelerometer_request.php')
            .map(response => {
                return <Coordinates> response.json()
            });
    }

}

