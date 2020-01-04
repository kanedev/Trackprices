const express = require('express');
var createError = require('http-errors');
const path = require('path');
const bodyParser= require('body-parser');
let urlencoded= bodyParser.urlencoded({extended:false});
const logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
//import params from '../js/config/params';


const app = express(),
            DIST_DIR = path.join(__dirname, '../../public'),
            HTML_FILE = path.join(DIST_DIR, 'index.html')
// Serve Static Files from /public            
app.use(express.static(DIST_DIR))




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
process.on('SIGINT',() => {
  mongoose.connection.close(() => {
      console.log("Database disconnected through app termination")
      process.exit(0)
    }
    
  )
}

)

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.methodOverride())


app.use(session({
  name: 'sessionId',
  secret: "mysecretkeythatiwillnottellyou",
  saveUninitialized: false, // don't create sessions for not logged in users (express-session)
  resave: false, //don't save session if unmodified
  
  // Where to store session data
  store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // = 14 days. ttl means "time to live" (expiration in seconds)
  }),

  // cookies settings
  cookie: {
    secure: false,  
    httpOnly: false, // if true, will disallow JavaScript from reading cookie data
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour;
  }
}))
// Passport Config
require('../js/config/passport')(passport); // pass passport for configuration
// Passport init (must be after establishing the session above)
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Pass 'req.user' as 'user' to ejs templates
// Just a custom middleware
app.use(function(req, res, next) {
res.locals.user = req.user || null;
// res.locals is an object available to ejs templates. for example: <%= user %>
next();
})













 //app.use(express.json());
 //app.use(express.urlencoded({ extended: false }));
// GET request with params
// app.get('/products/:d', (req, res) => {
//   let id = req.params.id
//   res.send('your ID is ${id}')
// });



// const mockResponse = {
//     foo: 'bar',
//     bar: 'foo'
//   };

//   app.post('/api',urlEncoded, (req, res) => {
//    // res.send(mockResponse);

// let response={
//   firstName : req.body.nom ,
//   lastName : req.body.prenom
// }

// res.send('<p>' + req.body.nom +' ' + req.body.prenom + '</p>')
// //res.send(JSON.stringify(response)); 

//   });

//   app.get('/contact', (req, res) => {
//    res.sendFile(HTML_FILE); // EDIT
//      // res.redirect('http://localhost:5000/');
//  //res.render(path.join(__dirname, 'index.js'));
 
//    });

// app.post('/api',urlEncoded, (req, res) => {
//   // res.send(mockResponse);

// let response={
//  firstName : req.body.nom ,
//  lastName : req.body.prenom
// }

// res.send('<p>' + req.body.nom +' ' + req.body.prenom + '</p>')
// //res.send(JSON.stringify(response)); 

//  });



// Routes ----------------------------------------------
app.use('/api/posts', require('../js/routes/api-posts'))
app.use('/auth', 	  require('../js/routes/auth'))
app.use('/', 		  require('../js/routes/pages'))

// Handles any requests that don't match the ones above
/*
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

// -----------------------------------------------------

//app.use('/api', );
//app.use('/test',require('../js/test'))
app.get('/api', (req, res) => {
  res.send('<p>' + req.query.nom +' ' + req.query.prenom + '</p>')
 //res.send('test');
   // res.redirect('http://localhost:5000/');
//res.render(HTML_FILE);

 });

//  app.get('/', (req, res) => {
//   res.sendFile(HTML_FILE); // EDIT
//    // res.redirect('http://localhost:5000/');
// //res.render(HTML_FILE);

//  });


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });







let port = 4000;
app.listen(port, () => {
    console.log('Example app listening on port http://localhost:'+port);
});

//Run app, then load http://localhost:port in a browser to see the output.