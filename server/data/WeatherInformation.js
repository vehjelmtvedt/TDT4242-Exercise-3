class WeatherInformation {
    // timestamp, cityName, temperature, weatherDescription
    constructor(timestamp, cityName, temperature, weatherDescription) {
        this.timestamp = timestamp;
        this.cityName = cityName;
        this.temperature = temperature;
        this.weatherDescription = weatherDescription;
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