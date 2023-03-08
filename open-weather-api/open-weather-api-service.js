const axios = require('axios');
/**
 * This class is used retrieve weather data for a given city, by calling the Open Weather API.
 * See here for the Open Weather API documentation - https://openweathermap.org/current.
 */
class OpenWeatherAPIService {

    // The API key that is needed to successfully authenticate when calling the Open Weather API. 
    // if this does not work, register one yourself using the instruction here: https://openweathermap.org/appid
    static apiKey = "c8da4ee199183df66c17fe7a2b6bf6da";
    static url = "https://api.openweathermap.org/data/2.5/weather"

    /**
     * Retrieves the weather data for the given city by calling the Open Weather API.
    */
    static async getWeather(cityName) {
        return axios.get(this.url, {
            params: {
                q: cityName,
                appid: this.apiKey
            }
        });
    }

    
}

module.exports = OpenWeatherAPIService;
