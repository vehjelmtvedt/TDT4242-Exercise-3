"use strict";

const OpenWeatherAPIService = require('../open-weather-api/open-weather-api-service');
const WeatherInformation = require('./data/WeatherInformation');
const cache = new Array();
async function getWeather(cityName) {
  // First, check if the cache has an entry for this city name
  var result = checkCache(cityName);
  if (result !== null) {
    return result;
  } else {
    // Ask api to fetch new data
    console.log("Fetching from API");
    return await fetchWeatherFromAPI(cityName);
  }
}
function fetchWeatherFromAPI(cityName) {
  return OpenWeatherAPIService.getWeather(cityName).then(response => {
    // Save response to cache and return it
    console.log("Got response, saving to cache now");
    console.log("Got this from cache:");
    const result = saveToCache(response.data);
    console.log(result);
    return result;
  }).catch(error => {
    res.status(500).send(error);
  });
}
function checkCache(cityToCheck) {
  for (const city of cache) {
    if (city['cityName'] === cityToCheck) {
      console.log("Found matching city in cache");
      return city;
    }
  }
  console.log("Didn't find city in cache");
  return null;
}
function saveToCache(data) {
  // Create weather information object
  try {
    var now = new Date().getTime();
    var cityName = data.name;
    var temp = data.main.temp_min;
    var description = data.weather[0].description;
    let newEntry = new WeatherInformation(now, cityName, temp, description);
    cache.push(newEntry);
    return newEntry;
  } catch {
    return {
      "Error": "couldnt save to cache"
    };
  }
}
module.exports = getWeather;