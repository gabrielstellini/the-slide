import {Component, OnInit, ElementRef} from '@angular/core';
import {RevieveAccelDataService} from "../services/revieve-accel-data.service";
import {CollidesWith} from "./collidesWith";
import set = Reflect.set;

let $ = require('../../../../node_modules/jquery/dist/jquery.min.js');


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    public calculatedRotation = 0;

    private boxX:number = 50;
    private boxY:number = -20;
    private speedX:number = 1;
    private speedY:number = 1;
    private accelX:number = 0;
    private accelY:number = 0;
    private lose:boolean = false;
    private win:boolean = false;
    private parallelBall:boolean = true;
    private offSlide = false;

    private moveRight = false;
    private basketX:number = 40;

    constructor(private accelDataService : RevieveAccelDataService) { }

    ngOnInit() {
        setInterval(() => {
            this.calculateRotation();
        }, 50);

        setInterval(() => {
            this.calculateSquareLocation();
        }, 30);

        this.checkBinCollision();
        this.calculateNewBasketLocation();
    }

    /**
     * Moves square left/right according to slide rotation
     */
    calculateSquareLocation(){

        if(!this.lose)
        {

            if((this.boxX < 400 || this.boxX > 0)&&(this.boxY === -20)) {

                this.accelX = Math.sin(this.calculatedRotation * Math.PI / 180.0);

                this.speedX += this.accelX;
                this.boxX += this.speedX;
            }

            if((this.boxX > 400 || this.boxX < 0)){

                //calculates new position of box after leaving see saw rotation
                //400 is width of see saw (400/2 for 1 side)
                if(!this.offSlide) {

                    this.offSlide = true;

                    let valToChangeSin:number = 0;
                    let valToChangeCos:number = 0;

                    //making sure values are treated as positives before sin/cos calculation
                    if (this.calculatedRotation > 0) {
                        valToChangeSin += Math.sin(this.calculatedRotation * Math.PI / 180.0) * 180;
                    }
                    else if(this.calculatedRotation < 0) {
                        valToChangeSin -= Math.sin(this.calculatedRotation * Math.PI / 180.0) * 180;
                    }

                    //when box leaves see saw at a high angle on the right hand side
                    if(this.boxX > 400 && this.calculatedRotation<0){
                        this.boxY -= valToChangeSin;

                    }
                    //when box leaves see saw at a high angle on the left hand side
                    else if(this.boxX < -20 && this.calculatedRotation>0){
                        this.boxY -= valToChangeSin;

                    }
                    //when box leaves see saw at a low angle on the right hand side
                    else if(this.boxX > 400 && this.calculatedRotation>0){
                        this.boxY += valToChangeSin;
                        // this.boxX -= (window.outerWidth/2) - valToChangeCos;
                    }
                    //when box leaves see saw at a low angle on the left hand side
                    else if(this.boxX < -20 && this.calculatedRotation<0){
                        this.boxY += valToChangeSin;
                        // this.boxX += (window.outerWidth/2) + valToChangeCos;
                    }
                }

                this.parallelBall =false;

                debugger;
                this.accelX -= this.accelX / 10;
                this.speedX += this.accelX;
                this.boxX += this.speedX;


                //speed limitY
                if (this.speedY < 30) {

                    this.accelY++;
                    this.speedY += this.accelY;
                }
                this.boxY += this.speedY;

                //lose if box goes below minwidth/2. Divided  by 2 since game element is centred
                if (window.innerHeight/2 < (this.boxY)) {
                    this.boxY = window.innerHeight/2;
                    this.lose = true;
                }
            }
        }
    }

    /**
     * Gets data from accelDataService
     * Code was left so that one can easily switch to x or z
     */
    calculateRotation(){
        this.accelDataService.getData().subscribe(coords => {


            let y = (coords.y - 10)/(-10-10) * (30+30) - 30;
            //let z = (tempCoordinates.z - 10)/(-10-10) * (30+30) - 30;

            // this.calculatedRotation = (x+y+z)/3;
            this.calculatedRotation = y;
        });

        //Y = (X-A)/(B-A) * (D-C) + C;
        //X falls between A and B and need to be mapped between B and C
        //let x = (tempCoordinates.x - 10)/(-10-10) * (30+30) - 30;

        //console.log("calculated rotation =" + this.calculatedRotation);
        // console.log("X data:" + tempCoordinates.x);
        // console.log("Y data:" + tempCoordinates.y);
        // console.log("Z data:" + tempCoordinates.z);
    }

    checkBinCollision(){


        let basket = document.getElementById('sensor-area');
        let box = document.getElementById('box');

        let boxCollisionObj = new CollidesWith(box);
        let basketCollisionObj = new CollidesWith(basket);

        setInterval(() =>{
                let result = basketCollisionObj.isCollide(boxCollisionObj);

                console.log(result);
            }
        );

    }

    //calculates next pos of basket
    calculateNewBasketLocation() {
        setInterval(()=>{
            //checks if basket needs to mmove left or right

            if(this.basketX === 0){
                this.moveRight = true;
            }else if((this.basketX+100) === innerWidth){
                this.moveRight = false;
            }

            if (this.moveRight) {
                this.basketX++;
            } else if (!this.moveRight) {
                this.basketX--;
            }

            debugger;
        },1);
    }

    getBasketLocation():string{
        console.log(this.basketX);
        return this.basketX + 'px';
    }

    /**
     * Rotate whole game
     * @returns {any}
     */
    getGameRotationStyle() : string {
        if(this.parallelBall){
            return 'rotate(' + this.calculatedRotation + 'deg)';
        }
        else return null;
    }

    /**
     * Rotate only the see saw
     * @returns {any}
     */
    getSeeSawRotationalStyle(): string{
        if(!this.parallelBall){
            return 'rotate(' + this.calculatedRotation + 'deg)';
        }
        else return null;
    }

    getBoxTop() : string{
        return this.boxY +'px';
    }

    getBoxLeft() : string{
        return this.boxX +'px';
    }

    // getBoxRotationStyle() : string{
    //     if(this.lose){
    //
    //         return 'rotate(' + -1*(this.calculatedRotation) + 'deg)';
    //     }
    //     else{
    //         return null;
    //     }
    // }
}