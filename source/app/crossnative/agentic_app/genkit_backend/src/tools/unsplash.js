import { ai } from "../ai.js";
import { z } from 'genkit';

// Ensure that you set the Unsplash API access key as an environment variable
import { UNSPLASH_ACCESS_KEY } from '../config.js';

// Fetches an image from the Unsplash Search API based on a specified search query.
// https://unsplash.com/documentation#search-photos
// Returns a single random image from the search results
async function getUnsplashImages(query) {
    if (!UNSPLASH_ACCESS_KEY) {
        throw new Error('Unsplash API access key is missing. Please set the UNSPLASH_ACCESS_KEY environment variable.');
    }

    const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&count=5&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Unsplash API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error('No images found for the given query.');
        }
        // Get a list of urls for regular resolution images
        const imageUrls = data.results.map((item) => item.urls.regular);

        // Return a single, random image URL.
        return imageUrls[Math.floor(Math.random() * imageUrls.length)]
    } catch (error) {
        throw new Error('Error fetching an image:', error);
    }
}

// Define a Genkit tool to get a single Unsplash image URL from a search query
export const getUnsplashTool = ai.defineTool({
    name: 'getImage',
    description: 'Provide a search query to find an image and get an image URL.',
    inputSchema: z.object({ "query": z.string().describe('A search term to find an image'), }),
    output: {
        schema: z.string().describe('Image URL'),
    },
}, async (input) => await getUnsplashImages(input.query));
