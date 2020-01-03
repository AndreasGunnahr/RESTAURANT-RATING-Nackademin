var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var db = require('../db/index')
// var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')
// checkAuthenticated

/* GET profile page. */
router.get('/', async function(req, res, next) {
    var user = await req.user;
    res.render('profile', { 
      style: 'profile.css',  //Finns ej
      isAuthenticated: user,
      partial: function() {
        return "dummy";
      }
    })
})

router.get('/create', async function(req, res, next){
  var user = await req.user;
  res.render('profile', { 
    style: 'createPost.css',
    isAuthenticated: user,
    partial: function() {
      return "createPost";
    }
  })
});

router.get('/edit', async function(req, res, next){
  var user = req.user;
  var allPosts = await db.allPosts('posts');
  res.render('profile', { 
    style: 'editPost.css',
    isAuthenticated: user,
    allPosts: allPosts,
    partial: function() {
      return "editPost";
    }
  })
});

router.get('/settings', async function(req, res, next){
  var user = await req.user;
  res.render('profile', { 
    style: 'profile.css',
    isAuthenticated: user,
    partial: function() {
      return "dummy";
    }
  })
});

module.exports = router;
