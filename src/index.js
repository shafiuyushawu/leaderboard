import './index.css';


class Leaderboard {
    constructor(gameId, apiEndpoint) {
        this.gameId = gameId;
        this.apiEndpoint = apiEndpoint;
        this.ul = document.getElementById('ul');
    }

    async getScores() {
        try {
            const response = await fetch(`${this.apiEndpoint}/games/${this.gameId}/scores`);
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(`Failed to fetch scores: ${error}`);
            return [];
        }
    }


    async addScore(name, score) {
        try {
            const response = await fetch(`${this.apiEndpoint}/games/${this.gameId}/scores`, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: name,
                    score
                })
            });
            const data = await response.json();
            console.log(data.result)
            return data.result;

        } catch (error) {
            console.error(`Failed to add score: ${error}`);
            return null;
        }
    }

    displayScores(scores) {
        this.ul.innerHTML = '';
        scores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `Name: ${score.user} Score: ${score.score}`;
            this.ul.appendChild(li);
        });
    }

    async refreshScores() {
        const scores = await this.getScores();
        this.displayScores(scores);
    }
}

const game = new Leaderboard('em248aqaTh6ZamapkysE', 'https://us-central1-js-capstone-backend.cloudfunctions.net/api');

const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const score = document.getElementById('score').value.trim();
    if (!name || !score) {
        return;
    }

    await game.addScore(name, score);
    await game.refreshScores();
    form.reset();

});

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', async () => {
    await game.refreshScores();
});

game.refreshScores();


