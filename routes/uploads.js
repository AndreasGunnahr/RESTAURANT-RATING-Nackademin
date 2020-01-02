var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../db/index')
// var passport = require('passport');
// var checkAuthenticated = require('../middleware/checkAuthenticated');
// var checkNotAuthenticated = require('../middleware/checkNotAuthenticated')

const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ 
    storage: storage, 
}).single('postImg');


/* POST a a new image to the post into the upload folder inside Public */ 
router.post('/img', (req, res) => {
   upload(req,res, (err) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.redirect('/')
        }
   });
});

module.exports = router;