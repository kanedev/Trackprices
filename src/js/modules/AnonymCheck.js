// On va scraper tous les books dela premiere page
const puppeteer = require('puppeteer')
const helpers =  require ('./helpers');


//let urlArticle='https://whatismycountry.com';
// Scrap one Article 
(async function scrapeArticle(urlArticle='https://whatismycountry.com') {
    try {

        // Création d’une instance de Chrome sanns mode headless
      const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized',
            '--proxy-server=https=41.191.205.2:8888'] // this is where we set the proxy
/*
If the proxy need authentication, we can add this code to support authentication. Put it before page.goto() part.

    // set the proxy credential
    await page.authenticate({'username': 'YOUR_USERNAME', 'password': 'YOUR_PASSWORD'});

*/
            //   slowMo: 250 // slow down by 250ms
        })
 
       let Article = await getInfoFromPage(browser, urlArticle)

       // Fermeture du navigateur
        // await browser.close()

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
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.setViewport({ width: 1366, height: 700});
        await page.goto(link,{timeout: 120000})
        await page.goto('https://arh.antoinevastel.com/bots/areyouheadless',{timeout: 120000})        
 
    // go to whatismycountry.com to see if proxy works (based on geography location)
    

        await page.waitForNavigation() 
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

