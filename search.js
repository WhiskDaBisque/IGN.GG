const form = document.getElementById('summoner-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const summonerName = document.getElementById('summoner-name').value;
  const apiKey = 'RGAPI-c3a956de-8e16-447c-ae6c-cc6874646b64';

  fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Account ID: ${data.accountId}</p>
        <p>Profile Icon ID: ${data.profileIconId}</p>
      `;
    })
    .catch(error => console.error('Error searching for player:', error));
});