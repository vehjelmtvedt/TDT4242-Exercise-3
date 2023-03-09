"use strict";

const WeatherInformation = require('./WeatherInformation');
class WeatherCache {
  constructor() {
    this.cache = Array();
  }
  getCityInCache(cityName) {
    // Check if city is in cache
    for (const city of this.cache) {
      if (city['cityName'] === cityName) {
        // Check if valid timestamp
        if (city.isValidCacheData()) {
          return city;
        } else {
          // If not, we remove the element and return null
          this.removeCityFromCache(city);
        }
      }
    }
    return null;
  }
  removeCityFromCache(cityElement) {
    let index = this.cache.indexOf(cityElement);
    if (index !== -1) {
      this.cache.splice(index, 1);
    } else {
      console.log("Did not find the element in cache to remove.");
    }
  }
  addCityToCache(weatherElement) {
    // Only save if cache is not full
    if (this.cache.length < 5) {
      // Create weather information object
      try {
        this.cache.push(weatherElement);
      } catch {
        console.log("Could not save to cache.");
      }
    }
  }
}
module.exports = WeatherCache;