"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getWeather = require('../local-weather-service');
const router = _express.default.Router();
router.get('/:city', async function (req, res) {
  const city = req.params.city;
  const result = await getWeather(city);

  // Check if result is 404
  if (result === 404) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});
router.get('/', function (req, res) {
  //TODO Implement
});
var _default = router;
exports.default = _default;