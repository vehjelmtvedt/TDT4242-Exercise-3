"use strict";

class WeatherInformation {
  // timestamp, cityName, temperature, weatherDescription
  constructor(timestamp, cityName, temperature, weatherDescription) {
    this.timestamp = timestamp;
    this.cityName = cityName;
    this.temperature = temperature;
    this.weatherDescription = weatherDescription;
  }
  isElementExpired() {
    // TODO
  }
}
module.exports = WeatherInformation;