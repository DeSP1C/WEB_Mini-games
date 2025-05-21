export default class AuthModel {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Невірний email або пароль');
        }
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    register(userData) {
        if (this.users.some(u => u.email === userData.email)) {
            throw new Error('Користувач з такою поштою вже існує');
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            profile: {
                avatar: "../images/DS.jpg",
                stats: {
                    gamesPlayed: 0,
                    daysStreak: 0,
                    favoriteGames: 0
                },
                favouriteGames: [],
                lastActivity: null
            }
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUserProfile(userId, profileData) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex].profile = {
                ...this.users[userIndex].profile,
                ...profileData
            };
            localStorage.setItem('users', JSON.stringify(this.users));
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.profile = this.users[userIndex].profile;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        }
    }
}