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

                    this.boxX = $('.left-top').offset().left;
                    this.boxY = $('.left-top').offset().top;

                    $("#box").detach().appendTo("body");

                    debugger;
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

                if (window.innerHeight < (this.boxY - 20)) {
                    this.boxY = window.innerHeight -20;
                    this.lose = true;
                }

                debugger;
            }
        }
    }

    /**
     * Gets data from accelDataService
     * Code was left so that one can easily switch to x or z
     */
    calculateRotation(){
        this.accelDataService.getData().subscribe(coords => {


            this.calculatedRotation = (coords.y - 10)/(-10-10) * (30+30) - 30;
            //let z = (tempCoordinates.z - 10)/(-10-10) * (30+30) - 30;

            // this.calculatedRotation = (x+y+z)/3;
        });
    }

    checkBinCollision(){
        let basket = document.getElementById('sensor-area');
        let box = document.getElementById('box');

        let boxCollisionObj = new CollidesWith(box);
        let basketCollisionObj = new CollidesWith(basket);

        setInterval(() =>{
                this.win = basketCollisionObj.isCollide(boxCollisionObj);
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
        },1);
    }

    getBasketLocation():string{
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
}