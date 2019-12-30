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
  res.render('index', { 
    title: 'Express',
    style: 'home.css',
    allPosts: allPosts,
    nrOfPosts: nrOfPosts,
    isAuthenticated: user
 });
});

module.exports = router;
