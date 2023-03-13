import request from 'supertest';
import app from '../server/app'
import { jest } from '@jest/globals'
const {
  getAllCacheData,
  resetCache
} = require('../server/local-weather-service');

describe('Test Funtionality', () => {
  beforeEach(() => {
    resetCache();
  });

  it('Test If Item Is Removed After 5 Minutes In Cache', async () => {
    jest.useFakeTimers();
    const response = await request(app).get('/weather/London');
    expect(getAllCacheData().length).toBe(1);
    jest.advanceTimersByTime(300000);
    expect(getAllCacheData().length).toBe(0)
  });

  it('Test Non-Existing City', async () => {
    const response = await request(app).get('/weather/Gotham City');
    expect(response.statusCode).toBe(404);
  });

  it('Test Bad Request', async () => {
    const response = await request(app).get('/weather/?max=0');
    expect(response.statusCode).toBe(400);
  });

  it('Test Get All Elements In Cache When max > cache.size()', async () => {
    await request(app).get("/weather/Washington");
    await request(app).get("/weather/Austin");
    const response = await request(app).get('/weather/?max=3');
    expect(response.body.length).toBe(2);
  });

  it('Test Get All Elements In Cache When max > 5', async () => {
    await request(app).get("/weather/Tokyo");
    await request(app).get("/weather/Cape Town");
    await request(app).get("/weather/New York");
    const response = await request(app).get('/weather/?max=10');
    expect(response.body.length).toBe(3);
  });

  it('Test Output In JSON Format As A List Containing Objects', async () => {
    await request(app).get("/weather/Trondheim");
    const response = await request(app).get('/weather/?max=1');
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toBeInstanceOf(Object)
  });

});
