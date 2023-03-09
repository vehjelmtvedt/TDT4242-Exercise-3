"use strict";

class WeatherInformation {
  // Constructor for object directly from WeatherAPI
  constructor(weatherObject) {
    this.timestamp = new Date().getTime();
    this.cityName = weatherObject.name;
    this.temp = Math.round(weatherObject.main.temp_min);
    this.description = weatherObject.weather[0].description;
  }
  isValidCacheData() {
    let now = new Date().now;
    let date = new Date(this.timestamp);
    if (now - date > 300000) {
      return false;
    } else {
      return true;
    }
  }
}
module.exports = WeatherInformation;