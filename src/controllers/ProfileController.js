import ProfileModel from '../models/ProfileModel.js';
import ProfileView from '../views/ProfileView.js';
export default class ProfileController {
    constructor() {
        this.model = new ProfileModel();
        this.view = new ProfileView();
        this.init();
    }

    init() {
        this.model.loadFromLocalStorage();
        
        this.view.updateStats(this.model.stats);
        this.view.updateLastActivity(this.model.lastActivity);
        this.view.updateFavoriteGames(this.model.favouriteGames);
        this.view.updateAvatar(this.model.avatar);

        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelector('.menu-button').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        document.querySelector('.avatar-on-profile').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => this.handleAvatarChange(e);
            input.click();
        });
    }

    handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.model.updateAvatar(e.target.result);
                this.view.updateAvatar(this.model.avatar);
            };
            reader.readAsDataURL(file);
        }
    }
}