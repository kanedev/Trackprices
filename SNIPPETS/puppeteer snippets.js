shuffle             = require('knuth-shuffle').knuthShuffle,
logger              = require('log4js'),


await page.click(USERNAME_SELECTOR);
await page.keyboard.type(CREDS.username);

await page.click(PASSWORD_SELECTOR);
await page.keyboard.type(CREDS.password);

await page.click(BUTTON_SELECTOR);

await page.waitForNavigation();

await page2.bringToFront();  

await page.authenticate({
    username: 'login',
    password: 'password',
});
page.goBack()
page.goForward()
page.goto()
page.reload()
page.setContent()
page.waitForNavigation()
page.goBack()
page.goForward()
page.goto()
page.reload()
page.setContent()
page.waitFor()
page.waitForFileChooser()
page.waitForFunction()
page.waitForNavigation()
page.waitForRequest()
page.waitForResponse()
page.waitForSelector()
page.waitForXPath()


Puppeteer popup event

Starting with puppeteer version 1.12, a special ‘popup’ event has been added to the page, which allows you to catch new tabs and pop-ups. We use it by rewriting the first example:

const puppeteer = require('puppeteer');         // puppeteer

const browser = await puppeteer.launch();       // run browser
const page = await browser.newPage();           // open new tab
await page.goto('https://site.com');            // go to site.com       

await page.waitForSelector('#goto');            // wait object load
const link = await page.$('#goto');             // declare object

const newPagePromise = new Promise(x => page.once('popup', x));

await link.click();                             // click, a new tab opens
const newPage = await newPagePromise;           // declare new tab /window, 
now you can work with it
await newPage.close();                          // close it, for example
...
await browser.close();                          // close browser

If, as in the second example, you need to track not a single event with a pop-up window, but listen to all such actions, you can use page.on(‘popup’, x).












