import { SnakeConfig } from "../models/Config.js";

export default class SnakeView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSnake(tails) {
        tails.forEach((segment, index) => {
            this.ctx.fillStyle = index  === 0 ? 'green' : 'lightgreen';
            this.ctx.fillRect(segment.x, segment.y, SnakeConfig.sizeCell, SnakeConfig.sizeCell);
        })
    }

    drawBerry(berry){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(berry.x, berry.y, SnakeConfig.sizeBerry, SnakeConfig.sizeBerry);
    }

    
}