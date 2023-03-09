import Leaderboard from "./Leaderboard.js";

const game = new Leaderboard('aOURfqS6nBnP825EHCwx', 'https://us-central1-js-capstone-backend.cloudfunctions.net/api');

const addUserScores = () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const score = document.getElementById('score').value.trim();
        if (!name || !score) {
            return;
        }

        game.addScore(name, score);
        game.refreshScores();
        form.reset();

    });
}

export default addUserScores