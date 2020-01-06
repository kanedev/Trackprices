// Import du paquet "puppeteer"
//const mypage =  require ('./modules/screenshot');
const product =  require ('./modules/Alicheck');
const Post = require('./models/post')
 

function randomSleep(minseconds,maxseconds) {
  sleep(Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds)
}

// MongoDB driver
const mongoose = require('mongoose');
const DB_URI=  "mongodb://localhost:27017/trackpricesdb"


// Connect to MongoDB
mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true } )
const db =  mongoose.connection;
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


// var key = "title"; //example
// var value = "ali";
// var filter = {};
// filter[key] = value;

    // Database Operation: get all posts from the database
 
   // let urlsProducts=[];





     Post.find({},function(err, data) {
        if (err || !data) {
            console.log(err)
            return; } 
    }) .sort({publishDate : -1 }) 
        .then((data) => {
      //  console.log(data)


      // On récupère tous les urls des produits dans la DB
     // let urlsProducts = data.map((item) => {  return item.url; })

      // console.log(urlsProducts);

       data.map((item) => {  
          
   let productData = product.scrapeProduct(item.url);
   
   console.log('old price : ' + item.price) 
   productData.then(producatDataItem => {
      console.log('new price : ' + producatDataItem.price) 

  if (item.price == producatDataItem.price ) {
    console.log("equal")
  } else {
    console.log("different" + item.id)
    //console.log(Post);

  let id = item.id
    Post.findByIdAndUpdate('5e0e06481174c2c826bbf0b7',
    
       {"$set": {title:   'chnawa title'}} 
     
      , function(err) {
        console.log('here');
        if (err) {
            console.log("ERROR:", err)
           
           // return;
        }
        console.log('price updated');
 
    })

  }

    }).then(() => {
                console.log('wait for 10 seconds . . . . ');
                return new Promise(function(resolve, reject) { 
                    setTimeout(() => {
                        console.log('10 seconds Timer expired!!!');
                        resolve();
                    }, 10000)
                });
            })
  } //------------- end map     
    ) 
  }).then(
    () => {

      // // Close connection to DB
mongoose.connection.close(() => {
  console.log("Database disconnected through app termination")
 
})
    }
  ) 


// // Close connection to DB




// let urlProduct = 'https://fr.aliexpress.com/item/32851771141.html'

// //Appel de la fonction scrape
// let productData = product.scrapeProduct(urlProduct);

// productData.then(item => {
//     console.log(item.price)

// // Close connection to DB
// mongoose.connection.close(() => {
//   console.log("Database disconnected through app termination")
//   process.exit(0)
// })

//  })









 
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
  

 
  
// If Node's process ends, close the MongoDB connection
// process.on('SIGINT',() => {
//   mongoose.connection.close(() => {
//       console.log("Database disconnected through app termination")
//       process.exit(0)
//     } )
// }
//)



 