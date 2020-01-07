var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')


/* GET login page. */ 
router.get('/', checkNotAuthenticated ,function(req, res, next) {
  res.render('login', { 
    style: 'login.css'
 });
});

/* POST login information */ 
router.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


module.exports = router;