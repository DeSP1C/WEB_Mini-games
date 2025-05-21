export default class MinesweeperView {
    constructor(container) {
        this.container = container;
        this.boardElement = document.createElement('div');
        this.boardElement.className = 'game-board';
        this.container.appendChild(this.boardElement);
    }

    createBoard(width, height) {
        this.boardElement.style.gridTemplateColumns = `repeat(${width}, 30px)`;
        this.boardElement.innerHTML = '';
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                this.boardElement.appendChild(cell);
            }
        }
    }

    updateCell(x, y, data) {
        const cell = this.boardElement.children[y * data.width + x];
        cell.className = 'cell';
        
        if (data.isRevealed) {
            cell.classList.add('revealed');
            if (data.isMine) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            } else if (data.neighborMines > 0) {
                cell.textContent = data.neighborMines;
                cell.style.color = this.getNumberColor(data.neighborMines);
            }
        } else if (data.isFlagged) {
            cell.classList.add('flag');
            cell.textContent = '🚩';
        } else {
            cell.textContent = '';
        }
    }

    getNumberColor(number) {
        const colors = [
            '#00eaff',
            '#00ff00',
            '#ff0000',
            '#0000ff',
            '#800000',
            '#008080',
            '#000000',
            '#808080' 
        ];
        return colors[number - 1] || '#000000';
    }

    showWinMessage() {
        const messageEl = document.getElementById('winner-message');
        if (messageEl) {
            messageEl.textContent = 'Перемога!';
            messageEl.style.display = 'block';
        }
    }

    showLoseMessage() {
        const messageEl = document.getElementById('winner-message');
        if (messageEl) {
            messageEl.textContent = 'Гра закінчена!';
            messageEl.style.display = 'block';
        }
    }
}