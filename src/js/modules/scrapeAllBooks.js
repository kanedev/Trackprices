// On va scraper tous les books dela premiere page
const puppeteer = require('puppeteer')
const helpers =  require ('./modules/helpers');

async function scrapeBooks() {
    try {

        // Création d’une instance de Chrome sanns mode headless
        const browser = await puppeteer.launch({
            headless: false,
            //   slowMo: 250 // slow down by 250ms
        })

        // Création d’un nouvel onglet
        const page = await browser.newPage()

        //await page.waitForNavigation() // The promise resolves after navigation has finished

        let urlPage = 'http://books.toscrape.com/';

        let books = [];
 
       // On récupère tous les liens de la page
        let linksBooks = await getUrlsFromPage(browser, urlPage);

        for (const link of linksBooks) {
          books = [...books, await getInfoFromPage(browser, link)]
        }

        // Fermeture du navigateur
        await browser.close()

        return books;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${e}`)
    }
}


// Fonction renvoie 
async function getInfoFromPage(browser, link) {
    try {
        const page = await browser.newPage()
        await page.goto(link)
        page.setViewport({ width: 1366, height: 700});
        await page.waitForNavigation() 
        await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoire entre 3 et 10 secondes
        

        const resultat = await page.evaluate(() => {
            let titre = document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main > h1').innerText;
            let prix = document.querySelector('.price_color').innerText;
            return { titre, prix }
        })
        page.close();

        return resultat;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${e}`)
    }

}

async function getUrlsFromPage(browser, url) {
    try {
        const page = await browser.newPage()
        await page.goto(url)        // Navigation vers l'URL souhaitée
        page.setViewport({ width: 1366, height: 700});
        await page.waitForNavigation() 
        await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoireentre 3 et 10 secondes

        // On récupere tous les liens des books sur la première page
        const linksBooks = await page.evaluate(() => {
            return [...document.querySelectorAll('div.image_container > a')].map(a => a.href);
        });
        return linksBooks;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${e}`)
    }

}


module.exports.getUrlsFromPage = getUrlsFromPage;
module.exports.getInfoFromPage = getInfoFromPage;
module.exports.scrapeBooks = scrapeBooks;

