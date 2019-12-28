var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
// var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')
// checkAuthenticated
/* GET profile page. */
router.get('/', async function(req, res, next) {
    var user = await req.user;
  res.render('profile', { 
    style: 'profile.css',
    isAuthenticated: user
  })
})


module.exports = router;
