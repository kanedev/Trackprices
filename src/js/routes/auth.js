const router = require('express').Router()
const passport = require('passport');


const express = require('express');
const path = require('path');

const app = express(),
            DIST_DIR = path.join(__dirname, '../../../public'),
            HTML_FILE_SIGNUP = path.join(DIST_DIR, 'signup.html'),
            HTML_FILE_LOGIN = path.join(DIST_DIR, 'login.html')
            
app.use(express.static(DIST_DIR))


//  Signup ====================================================================
router.get('/signup', function(req, res) {
    //res.render('signup');
    res.sendFile(HTML_FILE_SIGNUP )
});

router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect : '/auth/signup',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});

// Login ====================================================================
router.get('/login', function(req, res, next)  {
	if (req.user) {
		res.redirect('/')
	} else {
        // res.render('login')
        res.sendFile(HTML_FILE_LOGIN)
	}
})

router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/auth/login',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});


// LOGOUT ==============================
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});




module.exports = router;