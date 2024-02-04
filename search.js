const form = document.getElementById('summoner-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const summonerName = document.getElementById('summoner-name').value;
  const apiKey = 'RGAPI-c3a956de-8e16-447c-ae6c-cc6874646b64';

  fetch(`https://api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const accountId = data.accountId;
      const profileIconId = data.profileIconId;
      const region = data.region;

      // Look up match history
      const matchHistoryResponse = fetch(`https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`);

      // Look up ranked stats
      const rankedStatsResponse = fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${apiKey}`);

      Promise.all([matchHistoryResponse, rankedStatsResponse]).then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          resultDiv.innerHTML = `
            <h2>${data[0].summonerName}</h2>
            <img src="http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/profileicon/${profileIconId}.png" alt="${data[0].summonerName}'s profile icon">
            <p>Account ID: ${accountId}</p>
            <p>Profile Icon ID: ${profileIconId}</p>
            <h3>Match History</h3>
            <ul>
              ${data[0].matches.map(match => `<li>${match.gameId}</li>`).join('')}
            </ul>
            <h3>Ranked Stats</h3>
            <ul>
              ${data[1].map(entry => `<li>${entry.queueType}: ${entry.tier} ${entry.rank} (${entry.leaguePoints} LP)</li>`).join('')}
            </ul>
          `;
        })
        .catch(error => console.error('Error searching for player:', error));
    })
    .catch(error => console.error('Error searching for player:', error));
});