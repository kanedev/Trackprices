const puppeteer = require('puppeteer')

module.exports = {
// Déclaration d’une arrow function asynchrone *
 screenshot : async () => {

    // Création d’une instance de Chrome
   // const browser = await puppeteer.launch()
  
   // Création d’une instance de Chrome sanns mode headless
    const browser = await puppeteer.launch({ headless: false })




    // Création d’un nouvel onglet
    const page = await browser.newPage()
  
    // Navigation vers l'URL souhaitée
    await page.goto('http://www.google.com')
  
    // Screenshot de la page
    await page.screenshot({ path: 'screenshot.png' })
  
    // Fermeture du navigateur
    await browser.close()
  },

  //...
    
}





