import request from 'supertest';
import app from '../server/app'
import { jest } from '@jest/globals'
const {
  getWeather,
  getCacheData,
  getAllCacheData
} = require('../server/local-weather-service');

describe("Test Funtionality", () => {

  it("Test If Item Is Removed After 5 Minutes In Cache", async () => {
    jest.useFakeTimers();
    const response = await request(app).get("/weather/London");
    expect(getAllCacheData().length).toBe(1);
    // Advance time by 5 minutes
    jest.advanceTimersByTime(300000);
    // Check if item is removed from cache
    expect(getAllCacheData().length).toBe(0)
  });

});
