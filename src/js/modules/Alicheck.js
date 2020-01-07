// On va scraper tous les books dela premiere page
const puppeteer = require('puppeteer')
const helpers =  require ('./helpers');

// Scrap one product
async function scrapeProduct(urlProduct) {
    try {

        // Création d’une instance de Chrome sanns mode headless
        const browser = await puppeteer.launch({
            headless: true,
            //   slowMo: 250 // slow down by 250ms
        })

        // Création d’un nouvel onglet
       // const page = await browser.newPage()

        //await page.waitForNavigation() // The promise resolves after navigation has finished

       // let urlPage = 'http://books.toscrape.com/';
        // let urlProduct ='XXXXXXXXXXX'

       // let books = [];
 
       // On récupère tous les liens de la page
        // let linksBooks = await getUrlsFromPage(browser, urlPage);

        // for (const link of linksBooks) {
        //   books = [...books, await getInfoFromPage(browser, link)]
        // }


       let product = await getInfoFromPage(browser, urlProduct)

        // Fermeture du navigateur
        await browser.close()

       // return books;
       return product;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
}

// Scrap all products
async function scrapeAllProducts(urlProducts) {
    try {

        // Création d’une instance de Chrome sanns mode headless
        const browser = await puppeteer.launch({
            headless: true,
            //   slowMo: 250 // slow down by 250ms
        })

        // Création d’un nouvel onglet
       // const page = await browser.newPage()

        //await page.waitForNavigation() // The promise resolves after navigation has finished

       // let urlPage = 'http://books.toscrape.com/';
        // let urlProduct ='XXXXXXXXXXX'

       let products = [];
 

        for (const url of urlProducts) {
          products = [...products, await getInfoFromPage(browser, url)]
        }


     //  let product = await getInfoFromPage(browser, urlProduct)

        // Fermeture du navigateur
        await browser.close()

       // return products;
       return products;

    } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
}





// Fonction renvoie 
async function getInfoFromPage(browser, link) {
    try {
        const page = await browser.newPage()
        await page.goto(link,{timeout: 60000})
        page.setViewport({ width: 1366, height: 700});
       // await page.waitForNavigation() 
       // await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoire entre 3 et 10 secondes
        
       
        const resultat = await page.evaluate(() => {
            let title = document.querySelector('.product-title').innerText;
            let price = document.querySelector('.product-price-value').innerText;
            let image = document.querySelector('.magnifier-image').getAttribute('src');
            let shipping = document.querySelector('#root > div > div.product-main > div.product-main-wrap > div.product-info > div.product-shipping > div > span').innerText;
            return { title, price,image, shipping }
        })
     //.product-shipping-price > 
        await page.close();

        return resultat;

            } catch (error) {
        console.log(`error in getUrlsFromPage ${error}`)
    }
}

// async function getUrlsFromPage(browser, url) {
//     try {
//         const page = await browser.newPage()
//         await page.goto(url)        // Navigation vers l'URL souhaitée
//         page.setViewport({ width: 1366, height: 700});
//         await page.waitForNavigation() 
//         await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoireentre 3 et 10 secondes

//         // On récupere tous les liens des books sur la première page
//         const linksBooks = await page.evaluate(() => {
//             return [...document.querySelectorAll('div.image_container > a')].map(a => a.href);
//         });
//         return linksBooks;

//     } catch (error) {
//         console.log(`error in getUrlsFromPage ${e}`)
//     }

// }


// module.exports.getUrlsFromPage = getUrlsFromPage;
module.exports.getInfoFromPage = getInfoFromPage;
module.exports.scrapeProduct = scrapeProduct;

