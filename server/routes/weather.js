import express from 'express';
const weatherService = require('../local-weather-service');


const router = express.Router();

router.get('/:city', async function(req, res) {
  const city = req.params.city;
  const result = await weatherService.getWeather(city);

  // Check if result is 404
  if (result === 404) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result)
  }
});

router.get('/', function(req, res) {
  const max = req.query.max;
  const output = req.query.max === undefined ? weatherService.getAllCacheData() : weatherService.getCacheData(max);

  if (output === 400) {
    res.status(400).send("Bad request error.");
  } else {
    res.status(200).send(output);
  }
});



export default router;
