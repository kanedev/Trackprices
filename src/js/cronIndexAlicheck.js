// Import du paquet "puppeteer"
//const mypage =  require ('./modules/screenshot');
const product =  require ('./modules/Alicheck');
const Post = require('./models/post')
 

function randomSleep(minseconds,maxseconds) {
  setTimeout(() => {
console.log('Sleeping ...'); 
}, Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds)
  
}

// MongoDB driver
const mongoose = require('mongoose');
const DB_URI=  "mongodb://localhost:27017/trackpricesdb"


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


 try {
  console.log('Hello');

     // Connect to MongoDB
mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true } )

 
  Post.find({}).then(

    (data) => {
     // console.log(data);

     data.map(  (item,i) => {  

      
          
      let productData = product.scrapeProduct(item.url);

      //randomSleep(10,20) 

      console.log('old price : ' + item.price) 
      productData.then(producatDataItem => {
         console.log('new price : ' + producatDataItem.price) 
 
     if (item.prices[item.prices.length-1].price == producatDataItem.price ) {
       console.log("equal")
     } else {

       console.log("different")
       //console.log(Post);
   
   
    // mongoose.set('useFindAndModify', false);
       Post.findByIdAndUpdate(item.id,
    { $push: { prices :  { price : producatDataItem.price } }}
        //  {"$set": {title:   'chnawa title 444'}} 
        
         , function(err) {
           console.log('here');
           if (err) {
               console.log("ERROR:", err)
              
              // return;
           }
           console.log('price updated');
    
       })
   
   
   
   
      
   
   
     }
   
       })
   
   
       randomSleep(10,20) 
   
   
       }) //------------- end map


      }

     // end async
      
    ).then(() => {
      console.log('wait for 10 seconds . . . . ');
      return new Promise(function(resolve, reject) { 
          setTimeout(() => {
              console.log('10 seconds Timer expired!!!');
              resolve();
          }, 10000)
      });
  }).then(() => {    
  // Close connection to DB
 // mongoose.connection.close(() => {console.log("Database disconnected through finally block")})
 setTimeout(() => {
  console.log('30 seconds Timer expired!!!');
  mongoose.disconnect();
}, 30000)

} 
  ).catch (error => console.log(`there is an ERROR :  ${error}`)) 
 

//products.map (product => console.log(product) )

//console.log(products);





 } catch (error) {
  console.log(`there is an ERROR :  ${error}`)
 } finally {
   

 }