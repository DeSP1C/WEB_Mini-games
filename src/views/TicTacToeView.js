export default class TicTacToeView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = 100;
        this.padding = 10;
        
        this.canvas.width = this.cellSize * 3 + this.padding * 2;
        this.canvas.height = this.cellSize * 3 + this.padding * 2;
    }

    drawBoard(board) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;

        for (let i = 1; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize + this.padding, this.padding);
            this.ctx.lineTo(i * this.cellSize + this.padding, this.canvas.height - this.padding);
            this.ctx.stroke();
        }

        for (let i = 1; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding, i * this.cellSize + this.padding);
            this.ctx.lineTo(this.canvas.width - this.padding, i * this.cellSize + this.padding);
            this.ctx.stroke();
        }

        this.ctx.font = '60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        board.forEach((cell, index) => {
            if (cell) {
                const x = (index % 3) * this.cellSize + this.cellSize / 2 + this.padding;
                const y = Math.floor(index / 3) * this.cellSize + this.cellSize / 2 + this.padding;
                
                this.ctx.fillStyle = cell === 'X' ? '#00eaff' : '#ff00ff';
                this.ctx.fillText(cell, x, y);
            }
        });

        this.ctx.shadowBlur = 0;
    }

    drawGameOver(winner) {
        const text = winner ? `Переміг ${winner}!` : 'Нічия!';
        const x = this.canvas.width / 2;
        const y = this.canvas.height + 40;
        
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);

         this.ctx.shadowBlur = 0;
    }

    getCellFromCoordinates(x, y) {
        const cellX = Math.floor((x - this.padding) / this.cellSize);
        const cellY = Math.floor((y - this.padding) / this.cellSize);
        
        if (cellX >= 0 && cellX < 3 && cellY >= 0 && cellY < 3) {
            return cellY * 3 + cellX;
        }
        return -1;
    }
}