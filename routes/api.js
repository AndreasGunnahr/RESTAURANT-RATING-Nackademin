var express = require('express');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: '/uploads/' })
var db = require('../db/index')
// var passport = require('passport');
// var checkAuthenticated = require('../middleware/checkAuthenticated');
// var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')

/* POST a new comment */ 
router.post('/comment', async function(req, res, next){
    const insertComment = await db.insert('comments', req.body);
    const updateNrOfComment = await db.updateCountComment('posts', req.body.post_id )
    res.json({data: "DONE!"})


});

router.post('/upload', function(req, res, next){

});

// Kolla hur man gör något efter att vi 
router.post('/post', function(req, res, next){
    const insertPost = db.insert('posts', req.body)
    res.redirect('/');
});

module.exports = router;