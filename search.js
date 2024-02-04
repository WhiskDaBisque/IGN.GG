async function searchPlayerIGN(ign) {
    try {
      const riotAPIKey = 'RGAPI-c3a956de-8e16-447c-ae6c-cc6874646b64';
      const riotAPIURL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ign}?api_key=${riotAPIKey}`;
  
      const response = await fetch(riotAPIURL);
      const data = await response.json();
  
      if (data.id) {
        console.log(`Player ID: ${data.id}`);
        // Do something with the player ID, such as display it on the webpage
      } else {
        console.error('Player not found');
      }
    } catch (error) {
      console.error('Error searching for player:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBox = document.getElementById('search-box');
  
    searchButton.addEventListener('click', () => {
      const ign = searchBox.value;
      searchPlayerIGN(ign);
    });
  });
