import { ai } from "../ai.js";
import { z } from 'genkit';

import { OPEN_WEATHER_API_KEY } from '../config.js';

// Makes an API Call to the OpenWeather Geocoding API
// and returns an object with {latitude, longitude}
// https://openweathermap.org/api/geocoding-api

async function getLatLong(location) {
    // location has to be formatted exactly as: city,state
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location},usa&limit=1&appid=${OPEN_WEATHER_API_KEY}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.length >= 1) { // data successfully came back.
            const locationObject = data[0]
            return { lat: locationObject.lat, long: locationObject.lon };
        }

        throw new Error('Unable to get latitude and longitude.');
    }
    catch (error) {
        throw new Error('Error fetching latitude and longitude:', error);
    }
}

// Define a Genkit tool to get the latitude and logitude coordinates for a given location
const getLatLongTool = ai.defineTool({
    name: 'getLatLong',
    description: 'Use this tool to get the latitude and longitude for a location.',
    inputSchema: z.object({
        "location": z.string()
            .describe('The name of a place in the format of: City,State or Province. For example: Sunnyvale,California, Washington,DC, Honolulu,Hawaii ')
    }),
    output: {
        schema: z.object({
            lat: z.number().describe("The latitude of the location"),
            long: z.number().describe("The longitude of the location")
        })
    },
}, async (input) => await getLatLong(input.location));

export { getLatLongTool };
