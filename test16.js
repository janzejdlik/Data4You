const puppeteer = require('puppeteer');
const readline = require('readline');

const email = 'TEST@TEST.CZ';
const first_name = 'TEST';
const last_name = 'TEST';
const phone_number = '606328722';

(async () => {
  try {
    // Create a readline interface to prompt the user for websites.
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the websites (separated by commas): ', async (websites) => {
      rl.close();

      // Split the websites string into an array.
      const websiteList = websites.split(',');

      // Launch a new browser instance with Chrome.
      const browser = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/google-chrome' });

      // Loop through each website.
      for (const website of websiteList) {
        console.log(`Processing website: ${website.trim()}`);

        // Open a new page.
        const page = await browser.newPage();

        // Go to the current website.
        await page.goto(website.trim());
        console.log('Page opened successfully!');

        try {
          // Accept Cookies.
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
          // Type the email into the Email input.
          const emailInputXPath = '//*[@id="email"]';
          await page.waitForXPath(emailInputXPath);
          const [emailInputElement] = await page.$x(emailInputXPath);
          await emailInputElement.type(email);
          console.log('Email entered successfully!');
        } catch (error) {
          console.error('Error typing email:', error);
        }

        try {
          // Type the first name into the first name input field.
          const firstNameInputXPath = '//*[@id="first-name"]';
          await page.waitForXPath(firstNameInputXPath);
          const [firstNameInputElement] = await page.$x(firstNameInputXPath);
          await firstNameInputElement.type(first_name);
          console.log('First name entered successfully!');
        } catch (error) {
          console.error('Error typing first name:', error);
        }

        try {
          // Type the last name into the last name input field.
          const lastNameInputXPath = '//*[@id="last-name"]';
          await page.waitForXPath(lastNameInputXPath);
          const [lastNameInputElement] = await page.$x(lastNameInputXPath);
          await lastNameInputElement.type(last_name);
          console.log('Last name entered successfully!');
        } catch (error) {
          console.error('Error typing last name:', error);
        }

        try {
          // Type the phone number into the input field.
          const phoneNumberInputXPath = '//*[@id="phone"]';
          await page.waitForXPath(phoneNumberInputXPath);
          const [phoneNumberInputElement] = await page.$x(phoneNumberInputXPath);
          await phoneNumberInputElement.type(phone_number);
          console.log('Phone number entered successfully!');
        } catch (error) {
          console.error('Error typing phone number:', error);
        }

        // Close the current page before processing the next website.
        await page.close();
      }

      // Close the browser when done with all websites.
      await browser.close();
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
