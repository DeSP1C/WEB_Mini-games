import SnakeModel from '../models/SnakeModel.js';
import BerryModel from '../models/BerryModel.js';
import SnakeView from '../views/SnakeView.js';
import GameLoop from '../service/GameLoop.js';
import { SnakeConfig } from '../models/Config.js';
import ProfileModel from '../models/ProfileModel.js';

export default class SnakeController{
    constructor(canvas, scoreEl) {
        this.model = new SnakeModel();
        this.berry = new BerryModel(canvas.width, canvas.height);
        this.view = new SnakeView(canvas);
        this.profileModel = new ProfileModel();
        this.profileModel.loadFromLocalStorage();
        this.scoreEl = scoreEl;
        this.score = 0;
        this.currentDx = this.model.dx;
        this.currentDy = this.model.dy;

        document.addEventListener('keydown', e => this.handleInput(e));
        
        this.loop = new GameLoop(() => this.update());
        this.GameOver = false;

        this.initLikeButton();

    }

    handleInput(e){
        switch(e.code){
            case 'KeyW':
                if(this.model.dy == 0){
                    this.model.dx = 0;
                    this.model.dy = -SnakeConfig.sizeCell;
                }
                break;

            case 'KeyS':
                if(this.model.dy == 0){
                    this.model.dx = 0;
                    this.model.dy = SnakeConfig.sizeCell;
                }
                break;

            case 'KeyA':
                if(this.model.dx == 0){
                    this.model.dy = 0;
                    this.model.dx = -SnakeConfig.sizeCell;
                }
                break;

            case 'KeyD':
                if(this.model.dx == 0){
                    this.model.dy = 0;
                    this.model.dx = SnakeConfig.sizeCell;
                }
                break;

            case 'KeyP':
                this.model.togglePause();
                console.log(this.model.paused);
                break;
        }
    }

    update() {
        if(!this.model.paused){
            this.GameOver = false;
            this.scoreEl.textContent = `Score: ${this.score}`;
            SnakeConfig.step++;
            if (SnakeConfig.step < SnakeConfig.maxStep) return;
            SnakeConfig.step = 0;
            this.model.move();
            this.colisionBorder();
            this.model.updateTails();

            if(this.model.x === this.berry.x && this.model.y === this.berry.y){
                this.berry.isEaten = true;
                this.model.grow();
                this.score++;
            }

            if(this.model.checkSelfCollision()) {
                this.reset();
                this.GameOver = true;
                this.model.paused = true;
                
                return;
            }

            if(this.berry.isEaten) this.berry.respawn();

            this.view.clear();
            this.view.drawBerry(this.berry);
            this.view.drawSnake(this.model.tails);
        }
        else{
            if(this.GameOver) this.scoreEl.textContent = `Game Over!`;
            else this.scoreEl.textContent = "Game is paused!";
        }
    }

    updateLastActivity() {
        const gameData = {
            name: 'Змійка',
            url: 'snake.html',
            image: '../images/snake_low.jpg'
        };
        this.profileModel.setLastActivity(gameData);
    }

    colisionBorder(){
        if(this.model.x < 0) 
            this.model.x = this.view.canvas.width - SnakeConfig.sizeCell;
        else if(this.model.x >= this.view.canvas.width) this.model.x = 0;

        if(this.model.y < 0) 
            this.model.y = this.view.canvas.height - SnakeConfig.sizeCell;
        else if(this.model.y >= this.view.canvas.height) this.model.y = 0;
    }

    reset() {
        this.model.reset();
        this.score = 0;
        this.scoreEl.textContent = `Score: ${this.score}`;
        this.berry.respawn();
    }

    initLikeButton() {
        const likeBtn = document.getElementById('like-game');
        if (!likeBtn) return;

        const isLiked = this.profileModel.isGameFavorite('snake.html');
        if (isLiked) {
            likeBtn.classList.add('active');
            likeBtn.querySelector('.heart-icon').textContent = '♥';
        }

        likeBtn.addEventListener('click', () => {
            const game = {
                name: 'Змійка',
                url: 'snake.html',
                image: '../images/snake_low.jpg'
            };

            const isNowLiked = this.profileModel.toggleFavoriteGame(game);
            
            if (isNowLiked) {
                likeBtn.classList.add('active');
                likeBtn.querySelector('.heart-icon').textContent = '♥';
            } else {
                likeBtn.classList.remove('active');
                likeBtn.querySelector('.heart-icon').textContent = '♥';
            }
        });
    }
}