// On va scraper tous les books dela premiere page
const puppeteer = require('puppeteer')
const helpers =  require ('./helpers');

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
        // let urlProduct ='https://fr.aliexpress.com/item/33034690351.html?scm=1007.22893.125764.0&pvid=46de9b64-5106-42d9-8b84-fcc8c3f959a9&onelink_thrd=0.0&onelink_page_from=ITEM_DETAIL&onelink_item_to=33034690351&onelink_duration=1.274732&onelink_status=noneresult&onelink_item_from=33034690351&onelink_page_to=ITEM_DETAIL&af=137322&afref=&at_ts=1572597321&cv=47843&dp=fee84d314f3fbd19728b892a1c756424&mall_affr=pr3&aff_platform=aaf&cpt=1572597321936&sk=VnYZvQVf&aff_trace_key=b99730ff6ca04887be0ef67dd0c392bc-1572597321936-03377-VnYZvQVf&terminal_id=f9ae23dc217c469ba2ecaeb2f99df593'

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


// Fonction renvoie 
async function getInfoFromPage(browser, link) {
  
        const page = await browser.newPage()
        await page.goto(link)
        page.setViewport({ width: 1366, height: 700});
       // await page.waitForNavigation() 
       // await page.waitFor(helpers.randomNumber(3,10)) // fait une pause aléatoire entre 3 et 10 secondes
        
       
        const resultat = await page.evaluate(() => {
            let title = document.querySelector('.product-title').innerText;
            let price = document.querySelector('.product-price-value').innerText;
            return { title, price }
        })
     
        await page.close();

        return resultat;

    

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

