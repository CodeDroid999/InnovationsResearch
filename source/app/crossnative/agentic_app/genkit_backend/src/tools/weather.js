import { ai } from "../ai.js";
import { z } from 'genkit';

import { OPEN_WEATHER_API_KEY } from '../config.js';

// Makes an API Call to the OpenWeather 5 day weather forecast API
// Returns weather forecast data for 5 days with 3-hour step, including high, low, humidity, and weather condition.
// https://openweathermap.org/forecast5
async function getWeather(lat, lon, days) {
    if (!OPEN_WEATHER_API_KEY) {
        throw new Error('OpenWeather API Key is missing. Please set the OPEN_WEATHER_API_KEY environment variable.');
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${days}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherResponse = JSON.stringify(data);

        const { text } = await ai.generate(`
            Summarize this weather forecast data with a conversational language description for each day in the following format:
            Here is the JSON data: 
            <start of JSON data>
            ${weatherResponse}
            </end of JSON data>
            
            Here is a description of the JSON data format: 
            <start JSON data format descriptions>
            list
            list.dt Time of data forecasted, unix, UTC
            list.main
                list.main.temp Temperature. Unit Fahrenheit
                list.main.feels_like This temperature parameter accounts for the human perception of weather. Unit Fahrenheit
                list.main.temp_min Minimum temperature at the moment of calculation. Unit Fahrenheit
                list.main.temp_max Maximum temperature at the moment of calculation. Unit Fahrenheit
                list.main.pressure Atmospheric pressure on the sea level by default, hPa
                list.main.sea_level Atmospheric pressure on the sea level, hPa
                list.main.grnd_level Atmospheric pressure on the ground level, hPa
                list.main.humidity Humidity, %
                list.main.temp_kf Internal parameter
                list.weather
                    list.weather.id Weather condition id
                    list.weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
                    list.weather.description Weather condition within the group.
                    list.weather.icon Weather icon id
                list.clouds
                    list.clouds.all Cloudiness, %
                list.wind
                    list.wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
                    list.wind.deg Wind direction, degrees (meteorological)
                    list.wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
                list.visibility Average visibility, metres. The maximum value of the visibility is 10km
                list.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
                list.rain
                    list.rain.3h Rain volume for last 3 hours, mm.
                list.snow
                    list.snow.3h Snow volume for last 3 hours.
                list.sys
                    list.sys.pod Part of the day (n - night, d - day)
                list.dt_txt Time of data forecasted, ISO, UTC
            </end JSON data format descriptions>
        `);

        return text;
    } catch (error) {
        return console.error("Error fetching weather data:", error);
    }
}

// Define a Genkit tool to get the weather for a given latitude and logitude
export const getWeatherTool = ai.defineTool({
    name: 'getWeather',
    description: 'Use this tool to get the weather forecast for the next {{number of days}} in {{location specified by latitude and longitude}}.',
    inputSchema: z.object({
        lat: z.number().describe('The latitude of the location to get the weather forecast.'),
        long: z.number().describe('The longitude of the location to get the weather forecast.'),
        days: z.number().describe('Number of days to get the weather forecast'),
    }),
    output: {
        schema: z.array(
            z.object({
                day: z.string().describe('Date of the forecast in the format of: Day, Month Date, Year'),
                low: z.number().describe('Low temperature for the day'),
                high: z.number().describe('High temperature for the day'),
                humidity: z.number().describe('Humidity, %'),
                weather_condition: z.string().describe('A brief description of the weather condition, such as cloudy, sunny, rain, snow, etc.')
            },).describe('The weather forecast for a day.'),
        ).describe('The weather forecast for the specified location.')
    },
}, async (input) => await getWeather(input.lat, input.long, input.days));
