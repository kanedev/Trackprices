// Import du paquet "puppeteer"
//const mypage =  require ('./modules/screenshot');
const product =  require ('./modules/Alicheck');

// Appel de la fonction screenshot
//mypage.screenshot();

//Appel de la fonction scrapeBooks
let data = product.scrapeProduct();
data.then(value => {
    console.log(value)
  })
