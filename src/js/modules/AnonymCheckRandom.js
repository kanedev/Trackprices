// On va scraper tous les books dela premiere page
//const puppeteer = require('puppeteer')
const helpers =  require ('./helpers');


// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra')
const randomUA = require('modern-random-ua');
var ProxyLists = require('proxy-lists');
const notifyUser = require("./email");
const {params,email} = require("../config/params");
var  checkProxy = require("./checkProxy");
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

let notificatoins='';

  
  function randProxy(proxies){
     // On récupère une adresse IP aléatoire de la liste des proxies qu'on a récupéré !
     let indexFirstTab=Math.floor(Math.random() * (proxies.length - 1));
     let indexSecondTab=Math.floor(Math.random() * (proxies[indexFirstTab].length - 1));
     let randomProxy=proxies[indexFirstTab][indexSecondTab];
      return randomProxy;
}
    
  
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


  
 
 
var options = {
  anonymityLevels: ['elite'],
  filterMode: 'strict',
  protocols: ['http'],

 
};
// countries: ['de'],
// protocols: ['https'],
//   countries: ['fr']
//let tab=[];
// `gettingProxies` is an event emitter object.
var gettingProxies = ProxyLists.getProxies(options);




(() => { 
  
  console.log('Getting proxies is starting ...');

  return new Promise((resolve, reject) => {
   
  let proxies = [];

  gettingProxies.on('data', function(proxiez) {
    // Received some proxies.
    console.log('PROXIES : ',proxiez);
    console.log('Loading PROXIES ...');
    proxies=[...proxies,proxiez]

  });
  
  gettingProxies.on('error', function(error) {
  // Some error has occurred.
  //console.error(error);
  
  //notificatoins= notificatoins+'<br/> Some error has occurred when during getting proxies'  ;

  });
  
  gettingProxies.once('end', function() {
    // Done getting proxies.
   // console.log('PROXyTAB = ',proxies);
   // resolve(proxies);
   resolve(proxies);
  });
}


// end of Promise
);
  
}
)().then(
  async (proxies)=> {
    console.log('running proxies function');
    console.log('NEW PROXIES = ',proxies);
   //  scrapeArticle(proxies)

let nombreProxies=proxies.length;
if (nombreProxies>0) {

  //let proxy=randProxy(proxies)

let proxy='';
let protocol = 'http';
let abort = false;

  for (let j = 0; (j < proxies.length) && !abort ; j++) {
   // console.log(' 🚧 🚨 Loop j : ',j)
    for (let i = 0; (i < proxies[j].length) && !abort; i++) {
    //  console.log(' 🚧 🚨 START Loop i : ',i)

  let  goodProxy= await checkProxy(
      proxies[j][i].ipAddress,
      proxies[j][i].port,
    {
      // the complete URL to check the proxy
      url: 'https://example.com/',
      // an optional regex to check for the presence of some text on the page
      regex: /Example Domain/
    },
    // Callback function to be called after the check
    function(host, port, ok, statusCode, err) {
      console.log(host + ':' + port + ' => '
        + ok + ' (status: ' + statusCode + ', err: ' + err + ')');     
   // return ok //ok = true or false
      }
  ).then(
    (item) => {
    //  console.log('ITEM :',item)
      return item}
    )
  

  if (goodProxy == true) {
    abort = true;
    console.log(' 🚧🚧🚧🚧 🚨 a good proxy founded 🚨 🚧🚧🚧🚧')
    console.log('Good Proxy :'+proxies[j][i].ipAddress +':'+proxies[j][i].port)
    proxy=protocol+'://'+proxies[j][i].ipAddress +':'+proxies[j][i].port;
    notificatoins= notificatoins+'<br/> 📡 one good proxy founded : '+proxy  ;
    scrapeArticle(proxy)
   // console.log('Notifcations : ',notificatoins);
   // break;
    
  }
  else{
    console.log(' 🚧 🚨 no good proxy founded 🚨 🚧')
   // notificatoins= notificatoins+'<br/> 🚧 🚨 proxy founded but not good 🚨 🚧'  ;
  }
  //console.log(' 🚧 🚨 END Loop i : ',i)
  }

  }




 
  //let i=0;


  /*
  checkProxy(
    '88.198.24.108',
    '1080',
	{
		// the complete URL to check the proxy
		url: 'http://www.exemple.com',
		// an optional regex to check for the presence of some text on the page
		regex: /Example Domain/
	},
	// Callback function to be called after the check
	function(host, port, ok, statusCode, err) {
		console.log(host + ':' + port + ' => '
			+ ok + ' (status: ' + statusCode + ', err: ' + err + ')');
	}

)
  */
 

 
// if(typeof proxy.protocols === 'undefined' || proxy.protocols === null || proxy.protocols === "[Array]" ) {protocol = 'http'} else {
//   if(typeof proxy.protocols === 'array' ) {protocol =proxy.protocols[0] }  else {protocol=proxy.protocols}
// }

//console.log(`PROXY =${protocol}=${proxy.ipAddress}:${proxy.port}`);

//scrapeArticle(`${protocol}=${proxy.ipAddress}:${proxy.port}`)

  
} else {
console.log('There is no proxy available');
notificatoins= notificatoins+'<br/> There is no proxy available'  ;

let message = `<table class="table">
<thead>
  <tr>
    <th>Nothing scrapped</th>

  </tr>
</thead>
<tbody>
<tr>
    <td scope="row">${notificatoins}</td>
</tr>
</tbody>
</table>`

notifyUser(email,message);

} }
);
 
//let urlArticle='https://whatismycountry.com';
// Scrap one Article 
async function scrapeArticle(proxy) {
    try {
      console.log('scrap  with this proxy : ',proxy);
      let urlArticle='https://whatismycountry.com';
        //await getProxies();
        // Création d’une instance de Chrome sans mode headless
      const browser = await puppeteer.launch({
        
            headless: false,
            slowMo: 250, 
            ignoreHTTPSErrors: true,
           // userDataDir: './tmp',
            args: ['--start-maximized',
            `--proxy-server=${proxy}`

            ] 
        })


        // '--no-sandbox',
        // '--disable-setuid-sandbox',
        // '--disable-infobars',
        // '--window-position=0,0',
        // '--ignore-certifcate-errors',
        // '--ignore-certifcate-errors-spki-list',

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
          await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    
       // Random User Agent 
      //  await page.setUserAgent(randomUA.generate());

    //    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
        await page.setViewport({ width: 1024 + Math.floor(Math.random() * 100),
                                 height: 768 + Math.floor(Math.random() * 100)});
         
          // await page.goto('https://whatismycountry.com',{ timeout: 200000})
          // await page.screenshot({path:'whatismycountry.png'});
          console.log(await browser.userAgent());

        // get the User Agent on the context of Puppeteer
        const userAgent = await page.evaluate(() => navigator.userAgent );

        // If everything correct then no 'HeadlessChrome' sub string on userAgent
        console.log(userAgent);

// Scrap LBC
await page.waitFor(50000)

 //await page.setViewport({ width: 1024 + Math.floor(Math.random() * 100),
 //                        height: 768 + Math.floor(Math.random() * 100)});
 
//  await page.goto('https://www.akrotux.com/',{ timeout: 200000})
//await page.screenshot({path:'screenakrotux.png'});


const navigationPromise = page.waitForNavigation({ waitUntil: "networkidle2", timeout: 200000})

await page.goto('https://www.akrotux.com/',{ waitUntil: "networkidle2", timeout: 200000})

  


await page.setViewport({ width: 1280, height: 586 })

await page.waitForSelector('#site-navigation > .menu-primary > #menu-primary > #menu-item-2633 > a',{ waitUntil: "networkidle2", timeout: 200000})
await page.click('#site-navigation > .menu-primary > #menu-primary > #menu-item-2633 > a')

await navigationPromise

try {
await page.waitForSelector('.sumome-wysiwyg-scaledStage-contents > .sumome-react-wysiwyg-component:nth-child(6) > .sumome-react-wysiwyg-move-handle > div > button',{ waitUntil: "networkidle2", timeout: 200000})
await page.click('.sumome-wysiwyg-scaledStage-contents > .sumome-react-wysiwyg-component:nth-child(6) > .sumome-react-wysiwyg-move-handle > div > button')
} catch (error) {
  console.log('Selector 1 not found')
}


await page.waitForSelector('#main > .products > .post-style-grid > .woocommerce-LoopProduct-link > .attachment-woocommerce_thumbnail',{ waitUntil: "networkidle2", timeout: 200000})
await page.click('#main > .products > .post-style-grid > .woocommerce-LoopProduct-link > .attachment-woocommerce_thumbnail')

await navigationPromise


try {
  await page.waitForSelector('.sumome-react-wysiwyg-popup-container > .sumome-react-wysiwyg-outside-horizontal-resize-handles > .sumome-react-wysiwyg-move-handle > div > div:nth-child(2)')
await page.click('.sumome-react-wysiwyg-popup-container > .sumome-react-wysiwyg-outside-horizontal-resize-handles > .sumome-react-wysiwyg-move-handle > div > div:nth-child(2)')

} catch (error) {
  console.log('Selector 2 not found')
}



await navigationPromise

await page.screenshot({path:'screenAKROTUX.png'});



        console.log(`Testing the stealth plugin..`)
        await page.goto('https://bot.sannysoft.com',{ waitUntil: "networkidle2", timeout: 200000})
        await page.waitFor(5000)
        await page.screenshot({ path: 'stealth.png', fullPage: true })




 // go to whatismycountry.com to see if proxy works (based on geography location)
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1200, height: 800});
  await page2.goto('https://arh.antoinevastel.com/bots/areyouheadless',{waitUntil: "networkidle2",timeout: 200000})        
    
  await page2.screenshot({path:'areyouheadless.png'});


         // https://www.leboncoin.fr/annonces/offres/ile_de_france/
 
       





  console.log(`All done, check the screenshots. ✨`)
  notificatoins= notificatoins+'<br/> ✨ All done, check the screenshots. 😼 ' ;

           // await page.goto('https://arh.antoinevastel.com/bots/areyouheadless',{waitUntil: "networkidle2",timeout: 120000})        
    
        //     await autoScroll(page);
        // await page.waitForNavigation()
       // await page.screenshot({path:'page2.png'});
    
    
    
    
        //   let Article = await getInfoFromPage(browser, urlArticle)

       // Fermeture du navigateur
        await browser.close()

        let message = `<html><body><table class="table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">${notificatoins}</td>
   
          </tr>
        </tbody>
      </table></body></html>`;
     
      notifyUser(email,message);

       // return books;
      // return Article;

    } catch (error) {
      let message = `<table class="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Old price</th>
          <th>New price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row"> error in scrapeArticle ${error} </td>
        </tr>
      </tbody>
    </table>`
   
    notifyUser(email,message);
        console.log(`error in scrapeArticle ${error}`)
         process.exit(22);
    }
}

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
        console.log(`error in scrapeAllArticles ${error}`)
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
        console.log(`error in getInfoFromPage ${error}`)
    }
}

 


 














// module.exports.getUrlsFromPage = getUrlsFromPage;
module.exports.getInfoFromPage = getInfoFromPage;
//module.exports.scrapeArticle = scrapeArticle;

