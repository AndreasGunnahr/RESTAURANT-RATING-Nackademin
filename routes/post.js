var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkAuthenticated = require('../middleware/checkAuthenticated');
var db = require('../db/index');

/* POST a new post to the DB */ 
router.post('/new', checkAuthenticated, async function(req, res, next){
    const insertPost = await db.insert('posts', req.body)
    res.redirect('/');
});

/* POST a new comment to the DB */ 
router.post('/comment', checkAuthenticated, async function(req, res, next){
    const insertComment = await db.insert('comments', req.body);
    const updateNrOfComment = await db.updateCountComment('posts', req.body.post_id )
});

router.post('/rating', checkAuthenticated, async function(req,res,next){
    const user = await req.user;
    const data = {
        post_id: req.body.post_id,
        user_id: user.id,
        score: req.body.score
    }
    const insertRating = await db.insert('ratings', data);
    const updateRating = await db.updateRating('posts', user.id, req.body.post_id);
})

/* DELETE a specific post from the the DB */ 
router.delete('/delete/:id', checkAuthenticated, async function(req, res, next){
    const deletePost = await db.deletePost('posts', req.params.id);
});

/* UPDATE a specific post form the DB*/
router.put('/update/:id', checkAuthenticated, async function(req,res,next){
    const updatePost = await db.updatePost('posts', req.params.id, req.body);
    res.redirect('/profile/edit');
});


/* GET all info from a specific restaurant from the DB */
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