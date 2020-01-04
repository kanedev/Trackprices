

// MongoDB driver
const mongoose = require('mongoose');
const DB_URI= "mongodb://localhost:27017/trackpricesdb"


// Connect to MongoDB
mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true } )
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

// If Node's process ends, close the MongoDB connection

process.on('SIGINT',() => {
  mongoose.connection.close(() => {
      console.log("Database disconnected through app termination")
      process.exit(0)
    }
    
  )
}

)
