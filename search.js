import { getPlayerID } from './riotAPI';

const client = algoliasearch('TZ7GK93XBZ', '29d336cf1092b2b882288820351bd898');
const index = client.initIndex('player_records');

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchBox = document.getElementById('search-box');
  const searchResultsContainer = document.getElementById('search-results');

  searchButton.addEventListener('click', () => {
    const query = searchBox.value;

    index.search(query, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }

      // Clear the search results container
      searchResultsContainer.innerHTML = '';

      // Loop through the search results and display them
      results.hits.forEach(hit => {
        const searchResult = document.createElement('div');
        searchResult.textContent = hit.title; // Replace `title` with the actual attribute name in your Algolia index
        searchResultsContainer.appendChild(searchResult);
      });
    });
  });

  const searchIgnButton = document.getElementById('search-ign-button');
  searchIgnButton.addEventListener('click', () => {
    const ign = prompt('Enter player IGN:');
    if (ign) {
      searchPlayerIGN(ign);
    }
  });
});

async function searchPlayerIGN(ign) {
  try {
    const riotAPIKey = 'RGAPI-eb032dd0-f32e-4134-a043-0b46dba0aa80';
    const playerID = await getPlayerID(ign, riotAPIKey);
    console.log(`Player ID: ${playerID}`);
    // Do something with the player ID, such as display it on the webpage
  } catch (error) {
    console.error('Error searching for player:', error);
  }
}