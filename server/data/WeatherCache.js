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
            console.log("Did not find the element in cache to remove.")
        }
    }

    addCityToCache(weatherData) {
        // Create weather information object
        try {
            var now = new Date().getTime();
            var cityName = weatherData.name;
            var temp = Math.round(weatherData.main.temp_min);
            var description = weatherData.weather[0].description;
            let newEntry = new WeatherInformation(now, cityName, temp, description);
            this.cache.push(newEntry);
            return newEntry;
        } catch {
            return {"Error": "Could not save to cache"};
        }
    }
}

module.exports = WeatherCache;