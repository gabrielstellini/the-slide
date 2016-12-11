import {Component, OnInit, ElementRef} from '@angular/core';
import {RevieveAccelDataService} from "../services/revieve-accel-data.service";
let $ = require('../../../../node_modules/jquery/dist/jquery.min.js');

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    public calculatedRotation;

    private boxX = 100;
    private boxY = -200;

    constructor(private accelDataService : RevieveAccelDataService,
    private elementRef: ElementRef) { }

    ngOnInit() {
        setInterval(() => {
            this.calculateRotation();
            this.calculateSquareLocation();
        }, 50);
    }


    /**
     * Moves square down when there is no collision
     */
    calculateSquareLocation(){

        let temp = this.checkCollision();

        if(temp === "false") {
            this.boxY += 3;
        }
        else {
            this.boxY -= 10;
        }
    }


    /**
     * Gets data from accelDataService
     * Code was left so that one can easily switch to x or z
     */

    calculateRotation(){
        let tempCoordinates = this.accelDataService.getData();

        //Y = (X-A)/(B-A) * (D-C) + C;
        //X falls between A and B and need to be mapped between B and C

        //let x = (tempCoordinates.x - 10)/(-10-10) * (30+30) - 30;
        let y = (tempCoordinates.y - 10)/(-10-10) * (30+30) - 30;
        //let z = (tempCoordinates.z - 10)/(-10-10) * (30+30) - 30;

        // this.calculatedRotation = (x+y+z)/3;
        this.calculatedRotation = y;
        //console.log("calculated rotation =" + this.calculatedRotation);

        // console.log("X data:" + tempCoordinates.x);
        // console.log("Y data:" + tempCoordinates.y);
        // console.log("Z data:" + tempCoordinates.z);
    }


    /***
     * Calculate collision of non rotated objects
     * @returns {string}
     */

    // isSquareColliding(){
    //     //let seesaw = document.getElementById('see-saw').getBoundingClientRect();
    //     let seesaw = document.getElementById('see-saw');
    //     let box = document.getElementById('box');
    //
    //     let isColliding = this.collision(seesaw,box);
    //
    //    return isColliding;
    // }

    // isColliding(div1, div2) {
    //
    //     let rect1 = div1.getBoundingClientRect();
    //     let rect2 = div2.getBoundingClientRect();
    //
    //     let overlap = !(rect1.right < rect2.left ||
    //     rect1.left > rect2.right ||
    //     rect1.bottom < rect2.top ||
    //     rect1.top > rect2.bottom);
    //
    //     return overlap;
    // }

    getRotationStyle() : string {
        return 'rotate(' + this.calculatedRotation +'deg)';
    }

    getBoxStyle() : string{
        return this.boxY +'px';
    }

    /**
     * Helper function to determine whether there is an intersection between the two polygons described
     * by the lists of vertices. Uses the Separating Axis Theorem
     *
     * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @return true if there is any intersection between the 2 polygons, false otherwise
     */

    doPolygonsIntersect (a, b) {
        let polygons = [a, b];
        let minA, maxA, projected, i, i1, j, minB, maxB;

        for (i = 0; i < polygons.length; i++) {

            // for each polygon, look at each edge of the polygon, and determine if it separates
            // the two shapes
            let polygon = polygons[i];
            for (i1 = 0; i1 < polygon.length; i1++) {

                // grab 2 vertices to create an edge
                let i2 = (i1 + 1) % polygon.length;
                let p1 = polygon[i1];
                let p2 = polygon[i2];

                // find the line perpendicular to this edge
                let normal = { x: p2.y - p1.y, y: p1.x - p2.x };

                minA = maxA = undefined;
                // for each vertex in the first shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                for (j = 0; j < a.length; j++) {
                    projected = normal.x * a[j].x + normal.y * a[j].y;
                    if (this.isUndefined(minA) || projected < minA) {
                        minA = projected;
                    }
                    if (this.isUndefined(maxA) || projected > maxA) {
                        maxA = projected;
                    }
                }

                // for each vertex in the second shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                minB = maxB = undefined;
                for (j = 0; j < b.length; j++) {
                    projected = normal.x * b[j].x + normal.y * b[j].y;
                    if (this.isUndefined(minB) || projected < minB) {
                        minB = projected;
                    }
                    if (this.isUndefined(maxB) || projected > maxB) {
                        maxB = projected;
                    }
                }

                // if there is no overlap between the projects, the edge we are looking at separates the two
                // polygons, and we know there is no overlap
                if (maxA < minB || maxB < minA) {
                    // console.log("polygons don't intersect!");
                    return false;
                }
            }
        }
        return true;
    };


    checkCollision() {
        let pointsa = new Array(4),
            pointsb = new Array(4);

        //children[0] is #a, children[1] is #b modify as necessary
        $('#box div').each( (i) => {
            debugger;
            pointsa[i] = {x: parseInt($(this.elementRef.nativeElement.children[1].children[0].children[i]).offset().left), y: parseInt($(this.elementRef.nativeElement.children[1].children[0].children[i]).offset().top)};
        });

        $('#see-saw div').each( (i) => {
            pointsb[i] = {x: parseInt($(this.elementRef.nativeElement.children[1].children[2].children[i]).offset().left), y: parseInt($(this.elementRef.nativeElement.children[1].children[2].children[i]).offset().top)};
        });

        let result = this.doPolygonsIntersect(pointsb, pointsa).toString();
        // console.log("intersection: " + result);

        return result;
    }

    isUndefined(a) {
        return a === undefined;
    }
}