var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')

/* GET register page. */
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('register', { 
    style: 'register.css'
  })
})

/* POST register page */ 
router.post('/', passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}));


module.exports = router;