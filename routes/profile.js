var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkAdminAuthenticated = require('../middleware/checkAdminAuthenticated');
var db = require('../db/index')

/* GET profile page. */
router.get('/', checkAuthenticated, async function(req, res, next) {
    var user = await req.user;
    res.render('profile', { 
      style: 'settingDashboard.css', 
      isAuthenticated: user,
      partial: function() {
        return "dashboard";
      }
    })
})

router.get('/create', checkAdminAuthenticated, async function(req, res, next){
  var user = await req.user;
  res.render('profile', { 
    style: 'createPost.css',
    isAuthenticated: user,
    partial: function() {
      return "createPost";
    }
  })
});

router.get('/edit', checkAdminAuthenticated, async function(req, res, next){
  var user = await req.user;
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

router.get('/settings', checkAuthenticated, async function(req, res, next){
  var user = await req.user;
  res.render('profile', { 
    style: 'settingDashboard.css',
    isAuthenticated: user,
    partial: function() {
      return "settings";
    }
  })
});

module.exports = router;
