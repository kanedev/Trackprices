// Import du paquet "puppeteer"
//const mypage =  require ('./modules/screenshot');
const product =  require ('./modules/Alicheck');
const Post = require('./models/post')
 
// MongoDB driver
const mongoose = require('mongoose');
const DB_URI=  "mongodb://localhost:27017/trackpricesdb"


// Connect to MongoDB
mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true } )
mongoose.set('useCreateIndex', true);
// connectioin events
mongoose.connection.once('connected', () => {
  console.log("Database connected to " + DB_URI)
})

mongoose.connection.on('error', () => {
  console.log("MongoDB connection error ")
})
mongoose.connection.once('disconnected', () => {
  console.log("Database disconnected ")
})

mongoose.set('useFindAndModify', false);


// If Node's process ends, close the MongoDB connection
// process.on('SIGINT',() => {
//   mongoose.connection.close(() => {
//       console.log("Database disconnected through app termination")
//       process.exit(0)
//     } )
// }

// )












//Appel de la fonction scrapeBooks
//let data = product.scrapeProduct(urlProduct);

// data.then(value => {

//     console.log(value)



//     })




// var key = "title"; //example
// var value = "ali";
// var filter = {};
// filter[key] = value;

 

let urlProduct = 'XXXXXXX'

//Appel de la fonction scrape
let productData = product.scrapeProduct(urlProduct);

productData.then(item => {
    console.log(item.price)
 })

 
//  Récupération d'un post à partir de la DB
// Post.findOne({"content":urlProduct}, function (err, data) {
//     console.log('into mongoose findone');

//  console.log(data.title);

//   mongoose.connection.close(() => {
//     console.log("FIN")    
//   })


// });

 

  // Post.findById('5dbb97a51f0742d97075610b', function(err, data) {
  //   if (err || !data) {
  //       console.log(err)
  //       return;
  //   }
   
  //   console.log(data);
    

  // });
  

  

  




