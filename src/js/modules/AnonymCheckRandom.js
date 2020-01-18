// On va scraper tous les books dela premiere page
//const puppeteer = require('puppeteer')
const helpers =  require ('./helpers');


// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra')
const randomUA = require('modern-random-ua');


// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())


const proxies = [
    "182.101.207.11:8080",
    "182.149.83.68:9999",
    "182.108.44.194:3128",
    "1.197.16.254:9999",
    "1.197.10.93:9999",
    "1.198.108.46:9999",
    "1.196.177.180:9999",
    "182.108.46.83:9999",
    "182.108.61.69:9999",

  ];
  
  const randProxy = () =>
    proxies[Math.floor(Math.random() * (proxies.length - 1))];
  
  const autoScroll = page =>
    page.evaluate(
      async () =>
        await new Promise((resolve, reject) => {
          let totalHeight = 0;
         // let distance = Math.floor(Math.random() * 100);
          let timer = setInterval(() => {
            let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, Math.floor(Math.random() * 100));
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, Math.floor(Math.random() * 3000));
        })
    );






//let urlArticle='https://whatismycountry.com';
// Scrap one Article 
(async function scrapeArticle(urlArticle='https://whatismycountry.com') {
    try {

        // Création d’une instance de Chrome sans mode headless
      const browser = await puppeteer.launch({
        
            headless: false,
            ignoreHTTPSErrors: true,
           // userDataDir: './tmp',
            args: ['--start-maximized',
            '--proxy-server=https=196.196.64.91:3128',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            ] 
        })

       // Set one random modern user agent for entire browser {userAgent: randomUA.generate(),}

        // `--proxy-server=http=${randProxy}`,

             // '--incognito'
/*
If the proxy need authentication, we can add this code to support authentication. Put it before page.goto() part.

    // set the proxy credential
    await page.authenticate({'username': 'YOUR_USERNAME', 'password': 'YOUR_PASSWORD'});

*/
            //   slowMo: 250 // slow down by 250ms
       




        const page = await browser.newPage();
        // one User agent per page
        //  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
         await page.setUserAgent(randomUA.generate());
        await page.setViewport({ width: 1200, height: 800});
         
          await page.goto('https://whatismycountry.com',{ waitUntil: "networkidle2", timeout: 120000})
    
          console.log(await browser.userAgent());

        // get the User Agent on the context of Puppeteer
        const userAgent = await page.evaluate(() => navigator.userAgent );

        // If everything correct then no 'HeadlessChrome' sub string on userAgent
        console.log(userAgent);

        await page.waitFor(5000)
        console.log(`Testing the stealth plugin..`)
        await page.goto('https://bot.sannysoft.com')
        await page.waitFor(5000)
        await page.screenshot({ path: 'stealth.png', fullPage: true })
      
        console.log(`All done, check the screenshots. ✨`)

          await page.screenshot({path:'page.png'});

 // go to whatismycountry.com to see if proxy works (based on geography location)
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1200, height: 800});
  await page2.goto('https://arh.antoinevastel.com/bots/areyouheadless',{waitUntil: "networkidle2",timeout: 120000})        
    
  await page2.screenshot({path:'page2.png'});



           // await page.goto('https://arh.antoinevastel.com/bots/areyouheadless',{waitUntil: "networkidle2",timeout: 120000})        
    
        //     await autoScroll(page);
        // await page.waitForNavigation()
       // await page.screenshot({path:'page2.png'});
    
    
    
    
        //   let Article = await getInfoFromPage(browser, urlArticle)

       // Fermeture du navigateur
        await browser.close()

       // return books;
      // return Article;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
})();

// Scrap all Articles
async function scrapeAllArticles(urlArticles) {
    try {

        // Création d’une instance de Chrome sanns mode headless
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized',
                                 '--proxy-server=https://84.22.45.81:8080'] // this is where we set the proxy
            //   slowMo: 250 // slow down by 250ms
        })

        // Création d’un nouvel onglet
       // const page = await browser.newPage()

        //await page.waitForNavigation() // The promise resolves after navigation has finished

       // let urlPage = 'http://books.toscrape.com/';
        // let urlArticle ='XXXXXXXXXXX'

       let Articles = [];
 

        for (const url of urlArticles) {
          Articles = [...Articles, await getInfoFromPage(browser, url)]
        }


     //  let Article = await getInfoFromPage(browser, urlArticle)

        // Fermeture du navigateur
        await browser.close()

       // return Articles;
       return Articles;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
}



// Fonction renvoie  les éléments scrapped from a page
async function getInfoFromPage(browser, link) {
    try {

         
       // await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoire entre 3 et 10 secondes
        
       
        // const resultat = await page.evaluate(() => {
        //     let title = document.querySelector('.product-title').innerText;
        //     let price = document.querySelector('.product-price-value').innerText;
        //     let image = document.querySelector('.magnifier-image').getAttribute('src');
        //     let shipping = document.querySelector('#root > div > div.product-main > div.product-main-wrap > div.product-info > div.product-shipping > div > span').innerText;
        //     return { title, price,image, shipping }
        // })
 
        await page.close();
        return resultat;

            } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
}

 


 














// module.exports.getUrlsFromPage = getUrlsFromPage;
module.exports.getInfoFromPage = getInfoFromPage;
//module.exports.scrapeArticle = scrapeArticle;

