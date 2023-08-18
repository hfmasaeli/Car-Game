import { Application } from '@pixi/app';
import  {Sprite} from '@pixi/sprite'
import { Level } from './level';
import {Texture} from "@pixi/core"
import Car from './car';

const carImg = require('./assets/car-red.png');
const trophyImg = require('./assets/trophy.png');

class Game {

    reward: number;
    car: Car;
    trophy: Sprite;
    app: Application;

    lastUpdateTime: number = performance.now();

    constructor(app: Application) {
        

        // CREATE CAR
        this.car = new Car();
        this.car.update();

        app.stage.addChild(this.car);
        

        // CREATE TROPHY

        // ADD LEVEL TEXT

        // CREATE UPDATE LOOP
        this.createUpdateLoop()

    }

    createUpdateLoop() {
        const delta = (performance.now() - this.lastUpdateTime) / 1000;
        this.update(delta);
        this.lastUpdateTime = performance.now();
        requestAnimationFrame(this.createUpdateLoop);
    }

    update(delta : number) {
        // UPDATE CAR POSITION
        this.moveCar()

        this.updateCarVelocity()

        this.checkForRewardCollection()
    }

    moveCar() {

    }

    updateCarVelocity() {

    }

    checkForRewardCollection() {

    }

}

export default Game;