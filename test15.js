const puppeteer = require('puppeteer');
const readline = require('readline');

const email = 'TEST@TEST.CZ';

(async () => {
  try {
    // Create a readline interface to prompt the user for websites
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the websites (separated by commas): ', async (websites) => {
      rl.close();

      // Split the websites string into an array
      const websiteList = websites.split(',');

      // Launch a new browser instance with Chrome
      const browser = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/google-chrome' });

      // Loop through each website
      for (const website of websiteList) {
        console.log(`Processing website: ${website.trim()}`);

        // Open a new page
        const page = await browser.newPage();

        // Go to the current website
        await page.goto(website.trim());
        console.log('Page opened successfully!');


        try {
        // Accept Cookies
        const acceptCookiesXPath = '/html/body/div[2]/div/div/form';
        await page.waitForXPath(acceptCookiesXPath);
        const [acceptCookiesElement] = await page.$x(acceptCookiesXPath);
        await acceptCookiesElement.click();
        console.log('Clicked on the Accept Cookies button successfully!');
        await page.waitForTimeout(3000);
          } catch (error) {
        console.error('Error accepting cookies:', error);
          }
          

        try {
        // Type the email into the Email input field using XPath
        const emailInputXPath = '//*[@id="email"]';
        await page.waitForXPath(emailInputXPath);
        const [emailInputElement] = await page.$x(emailInputXPath);
        await emailInputElement.type(email);
        console.log('Typed email successfully!');
        } catch (error) {
        console.error('Error typing email:', error);
        }
          

        // Close the current page before processing the next website
        await page.close();
      }

      // Close the browser when done with all websites
      await browser.close();
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();