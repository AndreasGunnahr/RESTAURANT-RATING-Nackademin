var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')
var db = require('../db/index')

/* GET all restaurant page. */
router.get('/', function(req, res, next) {
  
})

const asyncGetData = async (req, res, next) => {
    req.user = await req.user;
    req.comments = await db.all('comments', 'post_id', req.params.id);
    next()
}

/* GET the specific restaurant page */
router.get('/:id', async function(req, res, next) {
    let user = await req.user;
    let comments = await db.all('comments', 'post_id', req.params.id);
    // console.log(user)
    // console.log(comments)
    res.render('post', {
        style: 'post.css',
        isAuthenticated: user,
        comments: comments
    })
});


module.exports = router;