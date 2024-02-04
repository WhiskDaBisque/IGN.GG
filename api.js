const apiKey = 'RGAPI-c3a956de-8e16-447c-ae6c-cc6874646b64'; 
const baseUrl = 'https://na1.api.riotgames.com/lol/summoner/v4';


async function fetchSummonerByName(summonerName) {
    const apiKey = 'RGAPI-c3a956de-8e16-447c-ae6c-cc6874646b64'; 
    const baseUrl = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name';
  
    const url = `${baseUrl}/${encodeURIComponent(summonerName)}?api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch summoner data');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching summoner:', error);
      throw error;
    }
  }

console.log("api.js loaded");
