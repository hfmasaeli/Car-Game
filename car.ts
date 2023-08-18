import {Sprite} from "@pixi/sprite";
import {Texture} from "@pixi/core";

const carImg = require('./assets/car-red.png')

class Car extends Sprite {
    constructor() {
        super(carImg)
    }

    update() {
        this.width = 24;
        this.height = 48;
        // center the sprite's anchor point
        this.anchor.set(0.5);
        this.x = window.screen.width / 2
        this.y = window.screen.height / 2
    }
}

export default Car;