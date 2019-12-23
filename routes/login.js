var express = require('express');
var router = express.Router();
var passport = require('passport');
// // var db = require('../db/index')
// // const data = await db.all('Users');


/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { 
    style: 'login.css'
 });
});

/* POST login information */ 
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


module.exports = router;
