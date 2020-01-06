var express = require('express');
var router = express.Router();
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')
var db = require('../db/index')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var user = await req.user;
  var allPosts = await db.allPosts('posts');
  var nrOfPosts = allPosts.length;
  var allCuisine = await db.allCuisine('posts')
  res.render('index', { 
    title: 'Express',
    style: 'home.css',
    allPosts: allPosts,
    nrOfPosts: nrOfPosts,
    allCuisine: allCuisine,
    isAuthenticated: user
 });
});

module.exports = router;



// form action = ""

// addEventListener btn för att öppna update

// e.target.