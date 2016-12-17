import {Component, OnInit} from '@angular/core';
import {RevieveAccelDataService} from "../services/revieve-accel-data.service";
import {CollidesWith} from "./collidesWith";
import set = Reflect.set;
import {LocalUserService} from "../../shared/api/local-user.service";

let $ = require('../../../../node_modules/jquery/dist/jquery.min.js');

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: [LocalUserService]
})
export class GameComponent implements OnInit {
    public calculatedRotation = 0;

    private hiddenGame:boolean = false;
    private boxX:number = 50;
    private boxY:number = -20;
    private speedX:number = 1;
    private speedY:number = 1;
    private accelX:number = 0;
    private accelY:number = 0;
    private lost:boolean = false;
    private won:boolean = false;
    private parallelBall:boolean = true;
    private offSlide:boolean = false;
    private hideLvl:boolean = true;
    private level:number = 1;
    private alreadyIncreasedLvl:boolean = false;

    private moveRight:boolean = false;
    private basketX:number = 80;

    intitializeData(level){
        $("#box").detach().appendTo("#game");
        this.boxX = 50;
        this.boxY = -20;
        this.speedX = 1;
        this.speedY = 1;
        this.accelX = 0;
        this.accelY = 0;
        this.lost = false;
        this.won = false;
        this.parallelBall = true;
        this.offSlide = false;
        this.hideLvl = true;
        this.level = level;
        this.hiddenGame = false;
        this.alreadyIncreasedLvl = false;

        this.moveRight = false;
        this.basketX = 60;
    }

    constructor(private accelDataService : RevieveAccelDataService, private localStorageService:LocalUserService) {}



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

        if(!this.lost)
        {
            if((this.boxX < 400 || this.boxX > 0)&&(this.boxY === -20)&&(!this.offSlide)) {

                this.accelX = Math.sin(this.calculatedRotation * Math.PI / 180.0);
                this.accelX = this.accelX*((this.level*30+100)/100);
                this.speedX += this.accelX;
                this.boxX += this.speedX;
            }
            if(this.boxX > 400 || this.boxX < 0 || this.offSlide){
                //calculates new position of box after leaving see saw rotation
                //400 is width of see saw (400/2 for 1 side)
                if(!this.offSlide) {

                    this.offSlide = true;

                    let tempBoxCoordinates = $('.left-top').offset();
                    this.boxX = tempBoxCoordinates.left;
                    this.boxY = tempBoxCoordinates.top;

                    $("#box").detach().appendTo("body");
                }

                this.accelX -= this.accelX / 10;
                this.speedX += this.accelX;
                this.boxX += this.speedX;


                //speed limitY
                if (this.speedY < 20) {

                    this.accelY++;
                    this.speedY += this.accelY;
                }
                this.boxY += this.speedY;

                if (window.innerHeight < (this.boxY - 20)) {
                    this.boxY = window.innerHeight -20;
                    if(this.won === false) {
                        this.lost = true;
                        this.saveScore();
                        setTimeout(()=> {
                            this.intitializeData(1);
                        },2000);
                    }
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
            this.calculatedRotation = (coords.y - 10)/(-10-10) * (30+30) - 30;
        });
    }

    checkBinCollision(){
        let basket = document.getElementById('sensor-area');
        let box = document.getElementById('box');
        let boxCollisionObj = new CollidesWith(box);
        let basketCollisionObj = new CollidesWith(basket);


        setInterval(() =>{
            console.log("here");
            let tempWin = basketCollisionObj.isCollide(boxCollisionObj);
            if(!this.lost){

                this.won = tempWin;

                if(this.won && !this.alreadyIncreasedLvl){

                    this.increaseLevel();
                    this.alreadyIncreasedLvl = true;


                }
            }
        },30);
    }

    /**
     * Checks score and updates it if it is better than the last one
     */
    saveScore(){
        let currUserId = this.localStorageService.getCurrentUser();
        let currUser = this.localStorageService.getUser(currUserId.toString());

        if(currUser.score<this.level){
            this.localStorageService.setScore(this.level);
        }
    }

    increaseLevel(){
        this.level++;

        //resets game with a higher difficulty
        setTimeout(()=> {
            this.intitializeData(this.level);
        },2000);
    }

    /**
     * Using jquery defferals to delay code execution until user is shown level
     * @returns
     */


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

    isGameHidden():boolean{
        return this.lost || this.won || this.hiddenGame;
    }

    hasWon():boolean{
        return this.won;
    }

    hasLost():boolean{
        return this.lost;
    }

}