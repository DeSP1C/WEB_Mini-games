import MinesweeperModel from '../models/MinesweeperModel.js';
import MinesweeperView from '../views/MinesweeperView.js';
import ProfileModel from '../models/ProfileModel.js';

export default class MinesweeperController {
    constructor(container) {
        this.model = new MinesweeperModel(10, 10, 15);
        this.view = new MinesweeperView(container);
        this.profileModel = new ProfileModel();
        
        this.view.createBoard(this.model.width, this.model.height);
        this.initEventListeners();
        this.initLikeButton();
        this.initRestartButton();
        this.updateLastActivity();
    }

    initEventListeners() {
        this.view.boardElement.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell) {
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);
                this.handleCellClick(x, y);
            }
        });

        this.view.boardElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const cell = e.target.closest('.cell');
            if (cell) {
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);
                this.handleRightClick(x, y);
            }
        });
    }

    initRestartButton() {
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartGame());
        }
    }

    restartGame() {
        this.model.reset();
        this.view.createBoard(this.model.width, this.model.height);
        const messageEl = document.getElementById('winner-message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }

    handleCellClick(x, y) {
        if (this.model.reveal(x, y)) {
            this.updateBoard();
            if (this.model.isWin) {
                this.view.showWinMessage();
                this.handleGameWin();
            }
        } else if (this.model.gameOver) {
            this.revealAllMines();
            this.view.showLoseMessage();
        }
    }

    handleRightClick(x, y) {
        if (this.model.toggleFlag(x, y)) {
            this.updateBoard();
        }
    }

    updateBoard() {
        for (let y = 0; y < this.model.height; y++) {
            for (let x = 0; x < this.model.width; x++) {
                this.view.updateCell(x, y, {
                    ...this.model.board[y][x],
                    width: this.model.width
                });
            }
        }
    }

    revealAllMines() {
        for (let y = 0; y < this.model.height; y++) {
            for (let x = 0; x < this.model.width; x++) {
                if (this.model.board[y][x].isMine) {
                    this.model.board[y][x].isRevealed = true;
                    this.view.updateCell(x, y, {
                        ...this.model.board[y][x],
                        width: this.model.width
                    });
                }
            }
        }
    }

    handleGameWin() {
        if (!this.model.gameCompleted) {
            this.model.gameCompleted = true;
            const gameData = {
                name: 'Сапер',
                url: 'minesweeper.html',
                image: '../images/minesweeper.jpg'
            };
            this.profileModel.markGameAsCompleted(gameData);
        }
    }

    initLikeButton() {
        const likeBtn = document.getElementById('like-game');
        if (!likeBtn) return;

        const isLiked = this.profileModel.isGameFavorite('minesweeper.html');
        if (isLiked) {
            likeBtn.classList.add('active');
            likeBtn.querySelector('.heart-icon').textContent = '♥';
        }

        likeBtn.addEventListener('click', () => {
            const game = {
                name: 'Сапер',
                url: 'minesweeper.html',
                image: '../images/minesweeper_low.jpg'
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
            name: 'Сапер',
            url: 'minesweeper.html',
            image: '../images/minesweeper_low.jpg'
        };
        this.profileModel.setLastActivity(gameData);
    }
}