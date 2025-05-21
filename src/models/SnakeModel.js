import { SnakeConfig } from './Config.js'

export default class SnakeModel {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = SnakeConfig.sizeCell;
        this.y = SnakeConfig.sizeCell;
        this.dx = SnakeConfig.sizeCell;
        this.dy = 0;
        this.tails = [];
        this.maxTails = 3;
        this.paused = false;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    togglePause()
    {
        if (!this.paused)
        {
            this.paused = true;
        } 
        else if (this.paused)
        {
            this.paused = false;
        }

}
    
    grow() {
        this.maxTails++;
    }

    checkSelfCollision(){
        return this.tails.some((segment, index) => index > 0 && this.x === segment.x && this.y === segment.y);
    }

    updateTails() {
        this.tails.unshift({ x: this.x, y: this.y });
        if (this.tails.length > this.maxTails) {
            this.tails.pop();
        }
    }

}