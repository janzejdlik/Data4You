const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user for email
function promptEmail() {
  return new Promise((resolve, reject) => {
    rl.question('Enter your email: ', (email) => {
      resolve(email);
    });
  });
}

(async () => {
  try {
    // Launch a new browser instance with Chrome
    const browser = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/google-chrome' });

    // Open a new page
    const page = await browser.newPage();

    // Go to the desired URL
    await page.goto('https://www.codingbootcamp.cz/');
    console.log('Page opened successfully!');

    // Click on the Accept Cookies using XPath selector
    const acceptCookiesXPath = '/html/body/div[2]/div/div/form';
    await page.waitForXPath(acceptCookiesXPath);
    const [acceptCookiesElement] = await page.$x(acceptCookiesXPath);
    await acceptCookiesElement.click();
    console.log('Clicked on the Accept Cookies button successfully!');
    await page.waitForTimeout(5000);

    // Prompt the user for email
    const email = await promptEmail();

    // Click on the Email input element using XPath
    const emailInputXPath = '//*[@id="email"]';
    await page.waitForXPath(emailInputXPath);
    const [emailInputElement] = await page.$x(emailInputXPath);
    await emailInputElement.click();
    console.log('Clicked on the Email input element successfully!');

    // Paste the email given earlier
    await page.keyboard.type(email);
    console.log('Pasted the email successfully!');

    // Click on the Get Started button
    const getStartedButtonXPath = '//*[@id="programme"]/div[2]/div[2]/div[2]/div/form/div[2]/button';
    await page.waitForXPath(getStartedButtonXPath);
    const [getStartedButtonElement] = await page.$x(getStartedButtonXPath);
    await getStartedButtonElement.click();
    console.log('Clicked on the Get Started button element successfully!');

    //User Signed Up Sucessfully
    console.log('User Signed Up Sucessfully');


    // Close the browser when done
    // await browser.close();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
})();
