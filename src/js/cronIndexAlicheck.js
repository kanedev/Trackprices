// Import du paquet "puppeteer"
//const mypage =  require ('./modules/screenshot');

const product =  require ('./modules/Alicheck');
const Post = require('./models/post')

const notifyUser = require("./modules/email");
const {params,email} = require("./config/params");

 
function randomSleep(minseconds,maxseconds) {
  setTimeout(() => {
console.log('Sleeping ...'); 
}, Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds) }

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
  
     // Connect to MongoDB
mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true } )

 
  Post.find({}).then(

    (data) => {
     // console.log(data);

let pricesUpdated= [];

     data.map(  (item,i) => {  

      
          
      let productData = product.scrapeProduct(item.url);

      //randomSleep(10,30) 

      console.log('old price : ' + item.prices[item.prices.length-1].price) 
      productData.then(producatDataItem => {
         console.log('new price : ' + producatDataItem.price) 
 
     if (item.prices[item.prices.length-1].price == producatDataItem.price ) {
       console.log("equal")
     } else {
       console.log("different, I am sending an email ..")
     //  console.log(email);
    // pricesUpdated = [...pricesUpdated,{'title':item.title,'price':producatDataItem.price}] 
   //  notifyUser(email,'Product :'+producatDataItem.title+"<br> Old price :"+item.prices[item.prices.length-1].price+"<br> New price : "+producatDataItem.price);
   
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
       <td scope="row">`+producatDataItem.title+`</td>
       <td>`+item.prices[item.prices.length-1].price+`</td>
       <td>`+producatDataItem.price+`</td>
     </tr>
 
   </tbody>
 </table>`

 notifyUser(email,message);


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
      // randomSleep(10,20) 
       }) //------------- end map

       

      }

     // end async
      
    ).then(() => {    
      console.log('Please wait 30 seconds');
  // Close connection to DB
 // mongoose.connection.close(() => {console.log("Database disconnected through finally block")})
 setTimeout(() => {
  console.log('30 second is expered !!!');
  mongoose.disconnect();
}, 60000)

} 
  ).catch (error => console.log(`there is an ERROR :  ${error}`)) 
 

//products.map (product => console.log(product) )

//console.log(products);





 } catch (error) {
  console.log(`there is an ERROR :  ${error}`)
 } finally {
   

 }