import { Component, OnInit } from '@angular/core';
import {RevieveAccelDataService} from "../services/revieve-accel-data.service";



@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    public calculatedRotation;

    constructor(private accelDataService : RevieveAccelDataService) { }

    ngOnInit() {

        setInterval(() => {
            this.calculateRotation();
        }, 0.01);
    }

    //expects both a and b to be objects with x, y, width and height

    isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    calculateRotation(){
        let tempCoordinates = this.accelDataService.getData();
        //Y = (X-A)/(B-A) * (D-C) + C;
        //X falls between A and B and need to be mapped between B and C

        let x = (tempCoordinates.x - 10)/(-10-10) * (30+30) - 30;
        let y = (tempCoordinates.y - 10)/(-10-10) * (30+30) - 30;
        let z = (tempCoordinates.z - 10)/(-10-10) * (30+30) - 30;

        // this.calculatedRotation = (x+y+z)/3;
        this.calculatedRotation = y;
        console.log("calculated rotation =" + this.calculatedRotation);
        // console.log("X data:" + tempCoordinates.x);
        // console.log("Y data:" + tempCoordinates.y);
        // console.log("Z data:" + tempCoordinates.z);
    }

    getRotationStyle() : string {
        return 'rotate(' + this.calculatedRotation +'deg)';
    }
}
