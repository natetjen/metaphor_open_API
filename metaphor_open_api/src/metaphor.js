import axios from 'axios';


const BASE_URL = 'https://api.metaphor.systems';

let client;

function initializeMetaphor() {

  let apiKey = `${process.env.NEXT_PUBLIC_METAPHOR}`
  let baseURL = 'https://api.metaphor.systems'
    client = axios.create({
        baseURL: baseURL,
        headers: {
            'x-api-key': apiKey,
        },
    });
}

async function search(query, options = {}) {
    try {
        if (!client) {
            throw new Error("You must initialize Metaphor first with 'initializeMetaphor' function.");
        }
        const response = await client.post('/search', { query, ...options });
        return response.data;
    } catch (error) {
        console.error('Error during search:', error);
        throw error;
    }
}

async function getContentById(id) {
  try {
    if (!client) {
      throw new Error("You must initialize Metaphor first with 'initializeMetaphor' function.");
    }
    const response = await client.get('/contents', { params: { ids: [id] } });
    return (response.data.contents[0]); // Assuming you want to set the first content received
  } catch (error) {
    console.error('Error during getContentById:', error);
    throw error;
  }
}

// ... other functions like findSimilar, getContents, etc.



export {
    initializeMetaphor,
    search,
    getContentById
    // ... export other functions as needed
};
