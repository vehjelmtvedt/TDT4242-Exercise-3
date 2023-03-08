const OpenWeatherAPIService = require('../open-weather-api/open-weather-api-service');
const WeatherInformation = require('./data/WeatherInformation');
const WeatherCache = require('./data/WeatherCache');

// Create new cache
const cache = new WeatherCache();




async function getWeather(cityName) {
    // First, check if the cache has an entry for this city name
    var result = cache.getCityInCache(cityName);

    if (result !== null) {
        console.log("Cache returned data.")
        return result;
    } else {
        // Ask api to fetch new data
        console.log("Fetching from API")
        return await fetchWeatherFromAPI(cityName);
    }
}

function fetchWeatherFromAPI(cityName) {
    return OpenWeatherAPIService.getWeather(cityName)
      .then(response => {
        // Save response to cache and return it
        const result = cache.addCityToCache(response.data);
        // Remove timestamp before returning
        delete result.timestamp;
        return result;
      })
      .catch(error => {
        return error.response.status;
      });
  }

module.exports = getWeather;