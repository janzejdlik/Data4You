const puppeteer = require('puppeteer');
const readline = require('readline');

// Function to prompt the user for email
function promptEmail() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter your email: ', (email) => {
      rl.close();
      resolve(email);
    });
  });
}

(async () => {
  try {
    console.log('Starting process for SignUp form at https://www.codingbootcamp.cz/');

    // Launch a new browser instance with Chrome
    const browser = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/google-chrome' });

    // Open a new page
    const page = await browser.newPage();

    // Go to the desired URL
    await page.goto('https://www.codingbootcamp.cz/');
    console.log('Page opened successfully!');

    // Click on the Accept Cookies button using XPath selector
    const acceptCookiesXPath = '/html/body/div[2]/div/div/form';
    await page.waitForXPath(acceptCookiesXPath);
    const [acceptCookiesElement] = await page.$x(acceptCookiesXPath);
    await acceptCookiesElement.click();
    console.log('Clicked on the Accept Cookies button successfully!');
    await page.waitForTimeout(3000);

    let validEmail = false;
    let email;
    while (!validEmail) {
      // Prompt the user for email
      email = await promptEmail();

      // Validate the email format
      const emailRegex = /.+@.+/;
      if (!emailRegex.test(email)) {
        console.log('Please enter a valid email');
      } else {
        validEmail = true;
      }
    }

    // Type the email into the Email input field using XPath
    const emailInputXPath = '//*[@id="email"]';
    await page.waitForXPath(emailInputXPath);
    const [emailInputElement] = await page.$x(emailInputXPath);
    await emailInputElement.type(email);
    console.log('Typed email successfully!');

    // Click on the Sign Up button using XPath
    const signUpButtonXPath = '//*[@id="programme"]/div[2]/div[2]/div[2]/div/form/div[2]/button';
    await page.waitForXPath(signUpButtonXPath);
    const [signUpButtonElement] = await page.$x(signUpButtonXPath);
    await signUpButtonElement.click();
    console.log('Clicked on the Sign Up button successfully!');

    // Close the browser when done
    // await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();


cOOKIE JAR, PAMATOVAT COOKIE, NADEFINOVAT COOKIE DOPREDU 