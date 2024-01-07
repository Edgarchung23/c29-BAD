const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHaodoo() {
    try {
      // Make a request to the website
      const response = await axios.get('https://www.haodoo.net/');
  
      // Load the HTML content into Cheerio
      const $ = cheerio.load(response.data);
  
      // Extract data based on HTML elements and classes
      const bookTitles = [];
      $('.a03').each((_, element) => {
        const title = $(element).find('a').text().trim();
        bookTitles.push(title);
      });
  
      // Display the extracted data
      console.log('Book Titles:');
      console.log(bookTitles);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Call the function to initiate the scraping
  scrapeHaodoo();