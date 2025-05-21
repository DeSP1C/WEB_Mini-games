import AuthModel from './AuthModel.js';

export default class ProfileModel {
    constructor() {
        this.authModel = new AuthModel();
        if (!this.authModel.isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }
        
        this.stats = {
            gamesPlayed: 0,
            daysStreak: 0,
            favoriteGames: 0
        };
        this.lastActivity = null;
        this.avatar = "../images/DS.jpg";
        this.favouriteGames = [];
        
        this.loadFromLocalStorage();
    }

    updateStats(stats) {
        this.stats = {...this.stats, ...stats};
        this.saveToLocalStorage();
    }

    setLastActivity(game) {
        this.lastActivity = game;
        this.saveToLocalStorage();
    }

    updateAvatar(avatarUrl) {
        this.avatar = avatarUrl;
        this.saveToLocalStorage();
    }

    addFavoriteGame(game) {
        if (!this.favouriteGames.includes(game)) {
            this.favouriteGames.push(game);
            this.stats.favoriteGames = this.favouriteGames.length;
            this.saveToLocalStorage();
        }
    }

    toggleFavoriteGame(game) {
        const index = this.favouriteGames.findIndex(g => g.url === game.url);
        if (index === -1) {
            this.favouriteGames.push(game);
            this.stats.favoriteGames++;
            this.stats.gamesPlayed++;
        } else {
            this.favouriteGames.splice(index, 1);
            this.stats.favoriteGames--;
            this.stats.gamesPlayed--;
        }
        this.saveToLocalStorage();
        return index === -1;
    }

    isGameFavorite(gameUrl) {
        return this.favouriteGames.some(game => game.url === gameUrl);
    }

    loadFromLocalStorage() {
        const user = this.authModel.getCurrentUser();
        if (user && user.profile) {
            this.stats = user.profile.stats;
            this.lastActivity = user.profile.lastActivity;
            this.avatar = user.profile.avatar;
            this.favouriteGames = user.profile.favouriteGames;
        }
    }

    saveToLocalStorage() {
        if (this.authModel.currentUser) {
            const profileData = {
                stats: this.stats,
                lastActivity: this.lastActivity,
                avatar: this.avatar,
                favouriteGames: this.favouriteGames
            };
            this.authModel.updateUserProfile(this.authModel.currentUser.id, profileData);
        }
    }

    getUserData() {
        return {
            stats: this.stats,
            lastActivity: this.lastActivity,
            avatar: this.avatar,
            favouriteGames: this.favouriteGames
        };
    }
}