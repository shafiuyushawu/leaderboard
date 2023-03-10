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
      error(`Failed to fetch scores: ${error}`);
      return [];
    }
  }

  async addScore(name, score) {
    try {
      const response = await fetch(`${this.apiEndpoint}/games/${this.gameId}/scores`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: name,
          score,
        }),
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      error(`Failed to add score: ${error}`);
      return null;
    }
  }

  displayScores(scores) {
    this.ul.innerHTML = '';
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.className = 'px-2 py-1 text-2xl text-white even:bg-slate-200 even:text-black';
      li.textContent = `Name: ${score.user} Score: ${score.score}`;
      this.ul.appendChild(li);
    });
  }

  async refreshScores() {
    const scores = await this.getScores();
    this.displayScores(scores);
  }
}

export default Leaderboard;