export default class ProfileView {
    constructor() {
        this.statsContainer = document.querySelector('.item-container');
        this.activityContainer = document.querySelector('.user-profile-recent-activity');
        this.favouriteGamesContainer = document.querySelector('#favourite_game');
        this.avatarContainer = document.querySelector('.avatar-on-profile img');
    }

    updateStats(stats) {
        const statsElements = this.statsContainer.querySelectorAll('.stats-data');
        statsElements[0].textContent = stats.gamesPlayed;
        statsElements[1].textContent = stats.daysStreak;
        statsElements[2].textContent = stats.favoriteGames;
    }

    updateLastActivity(activity) {
        const container = document.querySelector('.user-profile-recent-activity');
        if (!activity) {
            container.innerHTML = `
                <h5>Остання активність</h5>
                <p class="no-activity">Ви ще не грали в жодну гру. Почніть зараз!</p>
            `;
        } else {
            container.innerHTML = `
                <h5>Остання активність</h5>
                <a href="${activity.url}" class="last-game-activity">
                    <img src="${activity.image}" alt="${activity.name}">
                </a>
            `;
        }
    }

    updateFavoriteGames(games) {
        const container = document.querySelector('.user-profile-favourite-game');
        const gamesContainer = document.getElementById('favourite_game');
    
        if (!games.length) {
            container.classList.add('no-games');
            gamesContainer.innerHTML = `
                <h6>Поки що, тут нема ваших улюблених ігор..</h6>
                <p>Щоб додати сюди ігри, натисність лайк у грі яка вам подобається!</p>
            `;
        } 
        else {
            container.classList.remove('no-games');
            gamesContainer.innerHTML = `
                <div class="favorite-games-grid">
                    ${games.map(game => `
                        <a href="${game.url}">
                            <img src="${game.image}" alt="${game.name}">
                        </a>
                    `).join('')}
                </div>
            `;
        }
    }   

    updateAvatar(avatarUrl) {
        this.avatarContainer.src = avatarUrl;
    }
}