// On va scraper tous les books dela premiere page

const puppeteer = require('puppeteer')

module.exports = {
// Déclaration d’une arrow function asynchrone *
 scrapeBooks : async () => {

    // Création d’une instance de Chrome
   // const browser = await puppeteer.launch()
  
   // Création d’une instance de Chrome sanns mode headless
    const browser = await puppeteer.launch({
       headless: false,
   //   slowMo: 250 // slow down by 250ms
    })

    // Création d’un nouvel onglet
    const page = await browser.newPage()
  
    // Navigation vers l'URL souhaitée
    await page.goto('http://books.toscrape.com/')
  
   //await page.waitForNavigation() // The promise resolves after navigation has finished
  
   // On récupere tous les liens des books sur la première page
    const linksBooks = await page.evaluate(() => {
    const links = [...document.querySelectorAll('div.image_container > a')].map(a => a.href);
    return links
    });


    // Début du 🚧
    let books =[];

    // 

    async function walid(link) {  
        const tab = await browser.newPage() 
        await tab.goto(link)    
        const resultat =  await tab.evaluate(() => {
         let titre = document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main > h1').innerText;
         let prix = document.querySelector('.price_color').innerText;
         return {titre, prix}
         }) 

         return resultat
        }







    for (const link of linksBooks) {
   //    results = [...results, await getDataFromUrl(browser, url)]
        //await sleep(1000)

        books = [...books, await walid(link)
            
            
            ]
      }


  



// Fin du 🚧


   //await page.click('li.col-xs-6:nth-child(1) > article:nth-child(1) > div:nth-child(1) > a:nth-child(1)'); 

   //await page.waitFor(1000) // fait une pause d'une seconde

/*
   const resultat = await page.evaluate(() => {
    
    let titre = document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main > h1').innerText;

    let prix = document.querySelector('.price_color').innerText;

return {titre, prix}
    });

*/
    

// page.waitForNavigation(), // The promise resolves after navigation has finished


    // Fermeture du navigateur
    await browser.close()

    return books;
  },

  //...
    
}





