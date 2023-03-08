import express from 'express';
const getWeather = require('../local-weather-service');
const OpenWeatherAPIService = require('../../open-weather-api/open-weather-api-service');


const router = express.Router();

router.get('/:city', async function(req, res) {
  const city = req.params.city;
  const result = await getWeather(city);
  console.log("From service")
  console.log(result);
  res.send(result)
});

router.get('/', function(req, res) {
  //TODO Implement
});


export default router;
