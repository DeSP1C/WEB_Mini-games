import { SnakeConfig } from './Config.js';

export default class BerryModel {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.isEaten = true;
    }

    respawn() {
        this.x = Math.floor(Math.random() * (this.canvasWidth / SnakeConfig.sizeBerry)) * SnakeConfig.sizeBerry;
        this.y = Math.floor(Math.random() * (this.canvasHeight / SnakeConfig.sizeBerry)) * SnakeConfig.sizeBerry;
        this.isEaten = false;
    }
}