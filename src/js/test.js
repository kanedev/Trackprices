const router = require('express').Router()

const express = require('express');
const path = require('path');

const app = express(),
            DIST_DIR = path.join(__dirname, '../../public'),
            HTML_FILE = path.join(DIST_DIR, 'index.html')
            
app.use(express.static(DIST_DIR))

router.get('/', function(req, res, next) {
   // res.send('Test page')
    res.sendFile(HTML_FILE )
   // res.sendStatus(403) // Forbidden
    
})
module.exports = router;



