const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false }); // Set `headless` to `true` if you don't want to see the browser GUI

    // Open a new page
    const page = await browser.newPage();

    // Go to the desired URL
    await page.goto('https://www.codingbootcamp.cz/');

    console.log('Page opened successfully!');

    // Close the browser when done
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
