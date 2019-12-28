var express = require('express');
var router = express.Router();
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var user = await req.user;
  res.render('index', { 
    title: 'Express',
    style: 'home.css',
    isAuthenticated: user
 });
});

module.exports = router;
