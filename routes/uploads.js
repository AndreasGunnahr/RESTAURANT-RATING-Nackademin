var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ 
    storage: storage, 
}).fields([
    { name: 'postImg', maxCount: 1 },
    { name: 'editImg', maxCount: 1 }
]);


/* POST a a new image to the post into the upload folder inside Public */ 
router.post('/img', (req, res) => {
   upload(req,res, (err) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(req.files['postImg'] != undefined){
                res.redirect('/');
            }else{
                res.redirect('/profile/edit');
            }
        }
   });
});

module.exports = router;