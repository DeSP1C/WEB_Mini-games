import TicTacToeModel from '../models/TicTacToeModel.js';
import TicTacToeView from '../views/TicTacToeView.js';
import ProfileModel from '../models/ProfileModel.js';

export default class TicTacToeController {
    constructor(canvas) {
        this.canvas = canvas;
        this.model = new TicTacToeModel();
        this.view = new TicTacToeView(canvas);
        this.profileModel = new ProfileModel();
        
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.initRestartButton();
        this.initLikeButton();
        
        this.view.drawBoard(this.model.board);
        this.updateLastActivity();
    }

    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const cellIndex = this.view.getCellFromCoordinates(x, y);
        
        if (cellIndex !== -1 && !this.model.gameOver) {
            if (this.model.makeMove(cellIndex)) {
                this.view.drawBoard(this.model.board);
                this.updateTurnIndicator();
                
                if (this.model.gameOver) {
                    this.showWinnerMessage();
                    if (!this.model.gameCompleted) {
                        this.model.gameCompleted = true;
                        const gameData = {
                            name: 'Хрестики-нолики',
                            url: 'tictactoe.html',
                            image: '../images/tictactoe.jpg'
                        };
                        this.profileModel.markGameAsCompleted(gameData);
                    }
                }
            }
        }
    }

    updateTurnIndicator() {
        const scoreEl = document.getElementById('score-count');
        if (scoreEl) {
            scoreEl.textContent = `Хід: ${this.model.currentPlayer}`;
        }
    }

    showWinnerMessage() {
        const messageEl = document.getElementById('winner-message');
        if (messageEl) {
            let message = '';
            if(this.model.winner){
            message = this.model.winner === 'X' ? 'Хрестики перемогли!' : 'Нулики перемогли!';

            messageEl.style.color = this.model.winner === 'X' ? `#00eaff` : `#ff00ff`
            messageEl.style.textShadow = `
                0 0 5px ${this.model.winner === 'X' ? '#00eaff' : '#ff00ff'},
                0 0 10px ${this.model.winner === 'X' ? '#00eaff' : '#ff00ff'},
                0 0 15px ${this.model.winner === 'X' ? '#00eaff' : '#ff00ff'}
            `;
            }
            else {
                message = 'Нічия!';
                messageEl.style.color = '#FFFFFF';
                messageEl.style.textShadow = '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF';
            }

            messageEl.textContent = message;
            messageEl.style.display = 'block';
        }
    }

     hideWinnerMessage() {
        const messageEl = document.getElementById('winner-message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }

    initRestartButton() {
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartGame());
        }
    }

    restartGame() {
        this.model.reset();
        this.view.drawBoard(this.model.board);
        this.updateTurnIndicator();
        this.hideWinnerMessage();
    }

    initLikeButton() {
        const likeBtn = document.getElementById('like-game');
        if (!likeBtn) return;

        const isLiked = this.profileModel.isGameFavorite('tictactoe.html');
        if (isLiked) {
            likeBtn.classList.add('active');
            likeBtn.querySelector('.heart-icon').textContent = '♥';
        }

        likeBtn.addEventListener('click', () => {
            const game = {
                name: 'Хрестики-нолики',
                url: 'tictactoe.html',
                image: '../images/tictactoe_low.jpg'
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

    updateLastActivity() {
        const gameData = {
            name: 'Хрестики-нолики',
            url: 'tictactoe.html',
            image: '../images/tictactoe_low.jpg'
        };
        this.profileModel.setLastActivity(gameData);
    }
}