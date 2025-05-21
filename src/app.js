import AuthController from './controllers/AuthController.js';
import SnakeController from './controllers/SnakeController.js';
import ProfileController from './controllers/ProfileController.js';
import TicTacToeController from './controllers/TicTacToeController.js';
import MinesweeperController from './controllers/MinesweeperController.js';

const auth = new AuthController();

const path = window.location.pathname;
const file = path.substring(path.lastIndexOf('/') + 1);
const pageName = file.substring(0, file.lastIndexOf('.'));
switch (pageName) {
    case 'snake': {
        const canvas = document.getElementById('game-canvas');
        const score = document.getElementById('score-count');

        if (!canvas) {
            console.error('Element with id "game-canvas" not found!');
            break;
        }
        if (!score) {
            console.error('Element with id "score-count" not found!');
            break;
        }

        if (auth.model.isAuthenticated()) {
            new SnakeController(canvas, score).loop.start();
        }
        break;
    }

    case 'registration': {
        if (auth.model.isAuthenticated()) {
            window.location.href = 'profile.html';
        }
        break;
    }

    case 'login': {
        if (auth.model.isAuthenticated()) {
            window.location.href = 'profile.html';
        }
        break;
    }

    case 'profile': {
        if (auth.model.isAuthenticated()) {
            const profile = new ProfileController();
        }
        break;
    }

    case 'tictactoe': {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) {
        console.error('Element with id "game-canvas" not found!');
        break;
    }

    if (auth.model.isAuthenticated()) {
        new TicTacToeController(canvas);
    }
    break;
}

case 'minesweeper': {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error('Element with id "game-container" not found!');
        break;
    }

    if (auth.model.isAuthenticated()) {
        new MinesweeperController(gameContainer);
    }
    break;
}

    default:
        console.warn('Unknown page:', pageName);
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('a[href="#logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.model.logout();
            window.location.href = 'login.html';
        });
    }
});