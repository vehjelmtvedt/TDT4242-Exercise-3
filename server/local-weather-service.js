const OpenWeatherAPIService = require('../open-weather-api/open-weather-api-service');
const WeatherInformation = require('./data/WeatherInformation');

// Create new cache
var cache = require('js-cache');
const TTL = 300000;

async function getWeather(cityName) {
    // First, check if the cache has an entry for this city name
    var result = cache.get(cityName);

    if (result !== undefined) {
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
        let weatherObject = new WeatherInformation(response.data);
        // Save city to cache if possible
        if (cache.size() < 5) {
            cache.set(cityName, weatherObject, TTL);
        } else {
            cache.del(cache.keys()[0])
            cache.set(cityName, weatherObject, TTL);
        }
        delete weatherObject.timestamp;
        return weatherObject;
      })
      .catch(error => {
        return error.response.status;
      });
}

function getAllCacheData() {
    return getNumberOfElementsInCache(cache.size());
}

function getCacheData(max) {
    if (max < 1) {
        return 400;
    } else if (cache.size() === 0) {
        return [];
    } else if (max > cache.size()) {
        return getNumberOfElementsInCache(cache.size());
    } else {
        return getNumberOfElementsInCache(max)
    }
}

function getNumberOfElementsInCache(number) {
    let result = [];
    let keys = cache.keys();
    keys.reverse();

    for (let index = 0; index < number; index++) {
        let res = cache.get(keys[index]);
        result.push(cache.get(keys[index]));
    }

    return result;
}

module.exports = {getWeather, getCacheData, getAllCacheData};