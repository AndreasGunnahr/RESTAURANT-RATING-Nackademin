var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')

/* GET post page. */
router.get('/', function(req, res, next) {
  
})

/* GET the specific post page*/
router.get('/:id', async function(req, res, next) {
    var user = await req.user;
    res.render('post', {
        style: 'post.css',
        isAuthenticated: user
    })
});

module.exports = router;