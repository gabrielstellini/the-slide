import {Collidable} from "./Collidable";
/**
 * Created by gabriel on 12/14/16.
 */
export class CollidesWith extends Collidable{

    constructor(private anotherElement: Element){
        super(anotherElement);
    }
}