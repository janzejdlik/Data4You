const puppeteer = require('puppeteer');
const readline = require('readline');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const dbName = 'test_logs'; // Replace with your database name

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
          await page.waitForXPath(acceptCookiesXPath, { timeout: 2000 });
          const [acceptCookiesElement] = await page.$x(acceptCookiesXPath);
          await acceptCookiesElement.click();
          console.log('Clicked on the Accept Cookies button successfully!');
        } catch (error) {
          console.error('Field with accepting cookies was not on the website:');
        }

        try {
          // Type the email into the mail input element and check if it is on the website.
          const emailInputXPath = '//*[@id="email"]';
          await page.waitForXPath(emailInputXPath, { timeout: 2000 });
          const [emailInputElement] = await page.$x(emailInputXPath);
          await emailInputElement.type(email);
          console.log('Email entered successfully!');
        } catch (error) {
          console.error('Field with email was not found on the website:');
        }

        try {
          // Type the first name into the first name input field element and check if it is on the website.
          const firstNameInputXPath = '//*[@id="first-name"]';
          await page.waitForXPath(firstNameInputXPath, { timeout: 2000 });
          const [firstNameInputElement] = await page.$x(firstNameInputXPath);
          await firstNameInputElement.type(first_name);
          console.log('First name entered successfully!');
        } catch (error) {
          console.error('Field with first name was not found on the website:');
        }

        try {
          // Type the last name into the last name input field element and check if it is on the website.
          const lastNameInputXPath = '//*[@id="last-name"]';
          await page.waitForXPath(lastNameInputXPath, { timeout: 2000 });
          const [lastNameInputElement] = await page.$x(lastNameInputXPath);
          await lastNameInputElement.type(last_name);
          console.log('Last name entered successfully!');
        } catch (error) {
          console.error('Field with last name was not found on the website:');
        }

        try {
          // Type the phone number into the input field element and check if it is on the website.
          const phoneNumberInputXPath = '//*[@id="phone"]';
          await page.waitForXPath(phoneNumberInputXPath, { timeout: 2000 });
          const [phoneNumberInputElement] = await page.$x(phoneNumberInputXPath);
          await phoneNumberInputElement.type(phone_number);
          console.log('Phone number entered successfully!');
        } catch (error) {
          console.error('Field with phone number was not found on the webite:');
        }
        
        try {
          // Click on the Sign Up button element and check if it is on the website.
          const signUpButtonXPath = '/html/body/div[1]/section[1]/div[2]/div/div[1]/div[2]/div/div/form/div[2]/button';
          await page.waitForXPath(signUpButtonXPath, { timeout: 2000 });
          const [signUpButtonElement] = await page.$x(signUpButtonXPath);
          await signUpButtonElement.click();
          console.log('Clicked on the Sign Up button successfully!');
        } catch(error) {
          console.error('Field with sign up button was not found on the website')
        }

        try {
            // Clicking on the "What would you like to study?" dropdown
            const dropdownXPath = '/html/body/div[1]/section/div[2]/div/div/div/div[2]/form/div[1]/div[3]/div';
            await page.waitForXPath(dropdownXPath, { timeout: 2000 });
            const [dropdownElement] = await page.$x(dropdownXPath);
            await dropdownElement.click();

            
            
                // Choosing the "Web Development" option
            const webDevOptionSelector = 'body > div.wrapper-hp > section > div:nth-child(2) > div > div > div > div.application-wrapper > form > div:nth-child(2) > div:nth-child(3) > div > select > option:nth-child(2)';
            await page.waitForSelector(webDevOptionSelector, { timeout: 2000 });
            const webDevOptionElement = await page.$(webDevOptionSelector);
            await webDevOptionElement.click();
            
            console.log('Selected the Web Development course successfully!', error);
        } catch(error) {
            console.error('Error occurred while selecting the course');
        }
          
        try {
            // Click on the "Agree with terms and conditions" button element and check if it is on the website.
            const acceptTermsButtonXPath = '//html/body/div[1]/section/div[2]/div/div/div/div[2]/form/div[1]/div[4]/div';
            await page.waitForXPath(acceptTermsButtonXPath, { timeout: 2000 });
            const [acceptTermsButtonElement] = await page.$x(acceptTermsButtonXPath);
            await acceptTermsButtonElement.click();
            console.log('Clicked on the Accept Terms and Conditions button successfully!');
            } catch(error) {
            console.error('Field with Accept Terms and Conditions was not found on the website')
            }
          
        try {
            // Click on the "I would like to ask / Chci se zeptat" button element and check if it is on the website.
            const questionButtonXPath = '//*[@id="body"]';
            await page.waitForXPath(questionTermsButtonXPath, { timeout: 2000 });
            const [questionTermsButtonElement] = await page.$x(questionTermsButtonXPath);
            await questionTermsButtonElement.click();
            await emailInputElement.type("TEST");
            console.log('Question was written sucessfully!');
            } catch(error) {
            console.error('Field with space for a question was not found on the website')
            }
          


        // Close the current page before processing the next website
        // await page.close();
      }

      // Close the browser when done with all websites
      // await browser.close();
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
