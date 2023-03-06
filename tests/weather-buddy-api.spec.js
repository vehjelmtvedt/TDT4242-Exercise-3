import request from 'supertest';
import app from '../server/app'

describe("Test Endpoints", () => {

  it("Test Get City London", async () => {
    const response = await request(app).get("/weather/London");
    const body = response.body
    expect(response.statusCode).toBe(200);
    expect(body.cityName).toBe('London');
    expect(body.temperature).toBeDefined();
    expect(body.weatherDescription).toBeDefined();
  });

  it("Test Get City Paris", async () => {
    const response = await request(app).get("/weather/Paris");
    expect(response.statusCode).toBe(200);
    expect(response.body.cityName).toBe('Paris');
  });

  it("Test Get City Tokyo", async () => {
    const response = await request(app).get("/weather/Tokyo");
    const cityList = response.body
    expect(response.statusCode).toBe(200);
    expect(response.body.cityName).toBe('Tokyo');
  });

  /**
   * Note the three test cases below are not designed to be run in isolation, as they depend on state that was generated
   * as a result of the execution of the test cases declared above. They are split up solely for readibility purposes.
   */

  it("Test Get All Cities in Cache", async () => {
    const response = await request(app).get("/weather");
    const cityList = response.body
    expect(response.statusCode).toBe(200);
    expect(cityList.length).toBe(3);
    expect(cityList[0].cityName).toBe('Tokyo');
    expect(cityList[1].cityName).toBe('Paris');
    expect(cityList[2].cityName).toBe('London');
  });

  it("Test Get First 2 Cities in Cache", async () => {
    const response = await request(app).get("/weather/?max=2");
    const cityList = response.body
    expect(response.statusCode).toBe(200);
    expect(cityList.length).toBe(2);
    expect(cityList[0].cityName).toBe('Tokyo');
    expect(cityList[1].cityName).toBe('Paris');
  });

  it("Test Oldest Element In Cache Removed When Max Size Exceeded", async () => {
    await request(app).get("/weather/Washington");
    await request(app).get("/weather/Austin");
    await request(app).get("/weather/Rome");

    const response = await request(app).get("/weather");
    const cityList = response.body
    expect(response.statusCode).toBe(200);
    expect(cityList.length).toBe(5);
    expect(cityList[0].cityName).toBe('Rome');
    expect(cityList[4].cityName).toBe('Paris');
    expect(cityList.some(city => city.name === 'London')).toBeFalsy();
  });

});
