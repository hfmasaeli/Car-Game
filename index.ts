import { Application } from "@pixi/app"
import "./main.css"
import { Sprite } from "@pixi/sprite";
import { Texture } from "@pixi/core";
import { Text } from "@pixi/text";
import Game from "./game";

type Point = {
    x: number;
    y: number;
}

const carImg = require('./assets/car-red.png');
const trophyImg = require('./assets/trophy.png');
const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

document.body.appendChild(app.view as HTMLCanvasElement);

// const game = new Game(app);


let reward = 0 ;


//Car position
const car = new Sprite(Texture.from(carImg));
car.width = 24;
car.height = 48;

app.stage.addChild(car);

// center the sprite's anchor point
car.anchor.set(0.5)

// move the sprite to the center of the screen
car.x = app.screen.width / 2
car.y = app.screen.height / 2

//Trophy position
const trophy = new Sprite(Texture.from(trophyImg));
app.stage.addChild(trophy);
trophy.anchor.set(0.5);
trophy.x = Math.random() * app.screen.width - 14;
trophy.y = Math.random() * app.screen.height - 14;


let prevTime = performance.now()
let velocity = 0
const map = {
    ArrowDown: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false
}

// Text
const text = new Text(`${reward}x Points`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xff1010,
    align: 'center',
});

text.y = 10;
text.x = app.screen.width / 2  - text.width /2;

app.stage.addChild(text);

const update = () => {
    //Car movement
    const delta = (performance.now() - prevTime) / 1000;
    console.log(delta);
    const x = Math.sin(car.rotation) * velocity * delta;
    const y = Math.cos(car.rotation) * velocity * delta;
    car.y = Math.min(app.view.height, Math.max(0, car.y - y));
    car.x = Math.min(app.view.width, Math.max(0, car.x + x));

    //velocity

    const a = 120;

    if (map.ArrowUp) {
        velocity = Math.min(240, velocity + a * delta)
    } else if (velocity > 0) {
        velocity = Math.max(0, velocity - a * delta)
    }

    if (map.ArrowDown) {
        velocity = Math.max(-80, velocity - a * delta)

    } else if (velocity < 0) {
        velocity = Math.min(0, velocity + a * delta)
    }


    if (map.ArrowLeft && velocity != 0) {
        car.rotation = car.rotation - 0.1 * Math.abs(velocity) / 800
    } else if (map.ArrowRight && velocity != 0) {
        car.rotation = car.rotation + 0.1 * Math.abs(velocity) / 800
    }


    //Collision points

    const points = getPointsOfObject(car);

    const tp = { x: trophy.x, y: trophy.y };

    const d1 = dist(tp, points[0], points[1]);
    const d2 = dist(tp, points[1], points[2]);
    const d3 = dist(tp, points[2], points[3]);
    const d4 = dist(tp, points[3], points[0]);
    if (d1 < 14 || d2 < 14 || d3 < 14 || d4 < 14) {
        updateTrophyPosition();
        reward = reward + 1 ;
        
        text.text = `${reward}x Points`;
        
    }
    prevTime = performance.now();

    requestAnimationFrame(update)
}

const updateTrophyPosition = () => {
    const x = Math.random() * (app.screen.width - 28) + 14;
    const y = Math.random() * (app.screen.height - 28 - 10 - text.height) + 14 + 10 + text.height;

    trophy.x = x;
    trophy.y = y;
}

const getPointsOfObject = (object: Sprite) => {
    const points: Point[] = []
    points.push({ x: object.x - 12, y: object.y - 24 });
    points.push({ x: object.x - 12, y: object.y + 24 });
    points.push({ x: object.x + 12, y: object.y + 24 });
    points.push({ x: object.x + 12, y: object.y - 24 });
    return points;
}

const dist = (p: Point, l1: Point, l2: Point) => {
    const px = l2.x - l1.x;
    const py = l2.y - l1.y;

    const norm = px * px + py * py;

    let u = ((p.x - l1.x) * px + (p.y - l1.y) * py) / norm;
    if (u > 1) {
        u = 1;
    } else if (u < 0) {
        u = 0;
    }

    const x = l1.x + u * px;
    const y = l1.y + u * py;

    const dx = x - p.x;
    const dy = y - p.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist;
}

requestAnimationFrame(update)

document.onkeydown = (e) => {
    if (e.key == "ArrowUp") {
        map.ArrowUp = true;
    } else if (e.key == "ArrowDown") {
        map.ArrowDown = true;
    } else if (e.key == "ArrowLeft") {
        map.ArrowLeft = true;
    } else if (e.key == "ArrowRight") {
        map.ArrowRight = true;
    }
}

document.onkeyup = (e) => {
    if (e.key == "ArrowUp") {
        map.ArrowUp = false;
    } else if (e.key == "ArrowDown") {
        map.ArrowDown = false;
    } else if (e.key == "ArrowLeft") {
        map.ArrowLeft = false;
    } else if (e.key == "ArrowRight") {
        map.ArrowRight = false;
    }
}