var express = require('express');
var router = express.Router();
var db = require('../db/index');
// const data = await db.all('Users');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { 
    style: 'register.css'
  })
})

/* POST register page */ 
router.post('/', async function(req,res,next) {
  const insert = await db.insert('Users', req.body);
  res.redirect('/')
})

module.exports = router;