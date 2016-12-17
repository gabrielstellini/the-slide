/**
 * Created by gabriel on 12/14/16.
 */
export abstract class Collidable{


    constructor(private element: Element){
    }

    isCollide(anotherCollidableInstance: Collidable):boolean {

        let rect1 = anotherCollidableInstance.element.getBoundingClientRect();
        let rect2 = this.element.getBoundingClientRect();
        return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    }
}