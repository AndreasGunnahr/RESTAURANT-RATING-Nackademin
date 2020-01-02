var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var checkNotAuthenticated = require('../middleware/checkNotAuthenticated');
var db = require('../db/index');

const asyncGetData = async (req, res, next) => {
    req.user = await req.user;
    req.comments = await db.all('comments', 'post_id', req.params.id);
    next()
}

/* POST a new post to the DB */ 
router.post('/new', async function(req, res, next){
    const insertPost = await db.insert('posts', req.body)
    res.redirect('/');
});

/* POST a new comment to the DB */ 
router.post('/comment', async function(req, res, next){
    const insertComment = await db.insert('comments', req.body);
    const updateNrOfComment = await db.updateCountComment('posts', req.body.post_id )
    res.json({data: "DONE!"});
});

/* POST a new comment to the DB */ 
router.delete('/delete/:id', async function(req, res, next){
    const deletePost = await db.deletePost('posts', req.params.id);
    res.json({msg: deletePost})
});

/* GET all info from a specific*/
router.get('/info/:id', async function(req, res, next){
    let clickedPost = await db.one('posts', 'id', req.params.id);
    res.json({clickedPost})
});

/* GET the specific restaurant page from the DB */
router.get('/:id', async function(req, res, next) {
    let user = await req.user;
    let comments = await db.all('comments', 'post_id', req.params.id);
    let clickedPost = await db.one('posts', 'id', req.params.id);
    res.render('post', {
        style: 'post.css',
        isAuthenticated: user,
        clickedPost: clickedPost,
        comments: comments
    })
});


module.exports = router;