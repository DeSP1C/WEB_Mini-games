export default class TicTacToeModel {
    constructor() {
        this.reset();
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.winner = null;
    }

    makeMove(index) {
        if (!this.board[index] && !this.gameOver) {
            this.board[index] = this.currentPlayer;
            if (this.checkWin()) {
                this.gameOver = true;
                this.winner = this.currentPlayer;
                return true;
            } else if (this.board.every(cell => cell !== null)) {
                this.gameOver = true;
                return true;
            }
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            return true;
        }
        return false;
    }

    checkWin() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return lines.some(([a, b, c]) => {
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return true;
            }
            return false;
        });
    }
}