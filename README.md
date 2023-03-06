## Project Description:
The [Open Weather API](https://openweathermap.org/current) is an API that allows you to access current weather data for over 200,000 cities across the globe. This project will implements a small service to query weather information from cities around the world. The existing codebase is an Express (https://expressjs.com/) application server that provides the following two HTTP endpoints:

**1.** `GET /weather/:city`:
Gets the cached data for the specified city_name, otherwise fetches the data from the `Open Weather API`, caches the data and returns the results.
The output has to be in `JSON` format with the following three fields: cityName, temperature, and weatherDescription. The temperature should be the minimum temperature at the moment. The temperature should also be the Celsius value, rounded to the nearest integer. An example of an output is:
    {
        cityName: "London",
        temperature: 18,
        weatherDescription: "Scattered Clouds" 
    }
The data for any city should only live in the cache for a maximum time of 5 minutes. If the data is not available from the Open Weather API for the given city, throw a `404` Not Found error.

**2.** `GET /weather?max=<max_number>`:
Gets the data for all cities currently in the cache.
If the max query parameter is specified, return the latest entries, otherwise, return the 5 latest entries. The cache should have a maximum of 5 entries.
For example, if there are 4 entries in the cache, and max is 2, then return the data for 2 latest entries. If max is not specified, then return the data for all entries.
If max is < 1, throw a `400` Bad Request error.
If max is greater than the number of entries currently in the cache, return all entries.
The output has to be in JSON format, as a list containing objects, e.g.
    [  
        {
            cityName: "London",
            temperature: 18,
            weatherDescription: "Scattered Clouds" 
        },
        {
            cityName: "New York",
            temperature: 22,
            weatherDescription: "Clear Sky"
        }
    ]


## Your Task:

### Step 1 - Code implementation

**1.a.** You will implement the logic for the two endpoints in the [server/routes/weather.js](server/routes/weather.js) file.

**1.b.** You also need to implement the `getWeather()` method inside the [OpenWeatherAPIService](open-weather-api/open-weather-api-service.js) class.
We recommend [axios](https://www.npmjs.com/package/axios) for making HTTP requests to the Open Weather API. 

#### Requirements
The [tests/weather-buddy-api.spec.js](tests/weather-buddy-api.spec.js) file should not be modified.
For [tests/mygroupnumber_test.spec.js], you should use the [Jest](https://jestjs.io/) framework.
You are free to use whichever libraries you want (Node.js or third-party) when implementing your solution.
The [package.json](package.json) file should **only** be modified in order to add any third-party dependencies required for your solution.
The existing dependencies and versions should not be changed.
Your solution must use/be compatible with `Node.js` version `18.14.2`.
Your solution has to be compressed as a Zip file and uploaded in Assignment 3 portal, using the following name patterns: Ex2_GroupName_LastChangedDate.zip. For example: Ex2_Group08_20Jan.zip. **Do not include** the node_modules folder in the zip file.

#### Open Weather API
Open https://openweathermap.org/api and create our own account. The API key is all you need to call any of our weather APIs (https://openweathermap.org/appid). Once you sign up using your email, the API key (APPID) will be sent to you in a confirmation email.
#### Running the server
Make sure you have node installed by running `node --version`. If not, head over to [Node.js](https://nodejs.org/en/) to grab the Latest Stable Version (LTS). Run `npm install` to install all dependencies, then run `npm run watch:dev` to build and launch the server locally. The endpoints will be available locally at http://localhost:3000/weather. The server will automatically reload if you change any of the source files.
Run `npm run test` to run the tests. These should all pass if your solution has been implemented correctly.

### Step 2 - Test Implementation
Make sure that all the tests in the [tests/weather-buddy-api.spec.js](tests/weather-buddy-api.spec.js) file should pass for your implementation (in Step 1).

### Step 3 - Create own tests
Create your own test file (tests/mygroupnumber-test.spec.js) to validate all other requirements that are not mentioned in [tests/weather-buddy-api.spec.js]. Use Jest as the testing framework.
All the tests you created in [tests/mygroupnumber-test.spec.js] should pass. 

#### Running and validating instruction
Running the command `npm run test` should run all the tests in [tests/weather-buddy-api.spec.js](tests/weather-buddy-api.spec.js) and [tests/mygroupnumber-test.spec.js].

### Step 4 - Test Coverage and Reflection
**4.a. Test coverage:**
    Calculate and explain for the statement coverage and branch coverage you have achieved with the two testing files.
    
**4.b. Test plan:**
    Describe at least 3 blackbox testing techniques and 3 whitebox testing techniques that can be applied to the application.

Add the descriptions above in a text file (test-plan.txt) and include it in the zip file.

## Evaluation criteria:

**Step 1 (6 points)**

* weather.js correctly implemented - 3 points.
* open-weather-api-service.js correctly implemented - 3 points

**Step 2 (6 points)**

* all 6 pre-given integration/unit tests passed. 1 points for each test

**Step 3 (6 points)**

* 3 new integration/unit tests created and passed. 2 points for each test

**Step 4 (7 points)**

* Test coverage correctly calculated - 4 points.
* Test plan is reasonably presented - 3 points

