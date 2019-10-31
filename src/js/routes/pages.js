const router = require('express').Router()
// Models
const User = require('../models/user')

const express = require('express');
const path = require('path');

const app = express(),
            DIST_DIR = path.join(__dirname, '../../public'),
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            HTML_FILE_MEMBER = path.join(__dirname, '../../../public/member.html'),
            HTML_FILE_AUTHOR = path.join(__dirname, '../../../public/author.html')
            
app.use(express.static(DIST_DIR))

// Static Pages ================================================================
router.get('/', function(req, res, next) {
   // res.render('index')
   //res.sendFile(HTML_FILE )
})

router.get('/member', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isMember()) {
       // res.render('member')
       res.sendFile(HTML_FILE_MEMBER)
    } else {
        res.sendStatus(403) // Forbidden
    }
})

router.get('/author', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAuthor()) {
        //res.render('author')
        res.sendFile(HTML_FILE_AUTHOR)
    } else {
        res.sendStatus(403) // Forbidden
    }
})

module.exports = router;