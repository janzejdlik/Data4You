const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.codingbootcamp.cz/');
    console.log('Page opened successfully!');

    // Click on the element using XPath selector
    const xpath = '/html/body/div[2]/div/div/form';
    await page.waitForXPath(xpath);
    const [element] = await page.$x(xpath);
    await element.click();
    console.log('Clicked on the element successfully!');

    // Close the browser when done
    // await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();