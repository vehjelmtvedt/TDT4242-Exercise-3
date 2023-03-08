import express from 'express';
const getWeather = require('../local-weather-service');

const router = express.Router();

router.get('/:city', async function(req, res) {
  const city = req.params.city;
  const result = await getWeather(city);

  // Check if result is 404
  if (result === 404) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result)
  }
});

router.get('/', function(req, res) {
  //TODO Implement
});


export default router;
