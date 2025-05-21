export default class MinesweeperModel {
    constructor(width = 10, height = 10, mines = 15) {
        this.width = width;
        this.height = height;
        this.mines = mines;
        this.gameCompleted = false;
        this.reset();
    }

    reset() {
        this.board = Array(this.height).fill().map(() => 
            Array(this.width).fill().map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );
        this.gameOver = false;
        this.isWin = false;
        this.firstMove = true;
        this.remainingCells = this.width * this.height - this.mines;
    }

    placeMines(firstX, firstY) {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            
            if (!this.board[y][x].isMine && !(x === firstX && y === firstY)) {
                this.board[y][x].isMine = true;
                minesPlaced++;
                this.incrementNeighbors(x, y);
            }
        }
        this.firstMove = false;
    }

    incrementNeighbors(x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newX = x + i;
                const newY = y + j;
                if (this.isValidCell(newX, newY)) {
                    this.board[newY][newX].neighborMines++;
                }
            }
        }
    }

    reveal(x, y) {
        if (this.gameOver || this.board[y][x].isFlagged) return false;
        
        if (this.firstMove) {
            this.placeMines(x, y);
        }

        if (this.board[y][x].isMine) {
            this.gameOver = true;
            return false;
        }

        if (!this.board[y][x].isRevealed) {
            this.board[y][x].isRevealed = true;
            this.remainingCells--;

            if (this.board[y][x].neighborMines === 0) {
                this.revealNeighbors(x, y);
            }
        }

        if (this.remainingCells === 0) {
            this.gameOver = true;
            this.isWin = true;
            this.gameCompleted = true;
        }

        return true;
    }

    toggleFlag(x, y) {
        if (!this.gameOver && !this.board[y][x].isRevealed) {
            this.board[y][x].isFlagged = !this.board[y][x].isFlagged;
            return true;
        }
        return false;
    }

    revealNeighbors(x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newX = x + i;
                const newY = y + j;
                if (this.isValidCell(newX, newY) && !this.board[newY][newX].isRevealed) {
                    this.reveal(newX, newY);
                }
            }
        }
    }

    isValidCell(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
}