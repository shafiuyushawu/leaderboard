import Leaderboard from "./Leaderboard.js";

const game = new Leaderboard('aOURfqS6nBnP825EHCwx', 'https://us-central1-js-capstone-backend.cloudfunctions.net/api');

const refresh = () => {
    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', async () => {
        await game.refreshScores();
    });

    game.refreshScores();
}

export default refresh