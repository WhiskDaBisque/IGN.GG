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
});