// Importing the NPM packages that we installed
import * as cheerio from 'cheerio'
import fetch from 'node-fetch';

// Function starts here
async function getFormulaOneDrivers() {

    try {
        // Fetch data from URL and store the response into a const
        const response = await fetch('https://www.formula1.com/en/drivers.html');

        const body = await response.text();

        const $ = cheerio.load(body);

        //Create empty array
        const items: { rank: string; points: string; firstName: string; lastName: string; team: string; photo: string | undefined; }[] = [];

        // Selection Each col-12 class name and iterate through the list
        $('.listing-items--wrapper >.row >.col-12').map((i, el) => {

            // Select the rank class name add use the text method to only grab the content
            const rank = $(el).find('.rank').text();
            const points = $(el).find('points > .f1-wide--s').text();
            const firstName = $(el).find('.listing-item--name span:first').text();
            const lastName = $(el).find('.listing-item--name span:last').text();
            const team = $(el).find('.listing-item--team').text();
            const photo = $(el).find('.listing-item--photo img').attr('data-src');

            // Push the data into the items array
            items.push({
                rank,
                points,
                firstName,
                lastName,
                team,
                photo
            });

        })

        console.log(items)

    } catch (error) {
        console.log(error);
    }
}
getFormulaOneDrivers();

////--------------