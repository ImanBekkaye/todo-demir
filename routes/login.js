var express = require('express');
var router = express.Router();
var data = require('../helpers/data');


//GET login
router.get('/',function(req, res,next){
    res.render('login');
});

//POST login
router.post('/',function(req, res,next){
    var encryptPass= data.encrypt(req.body.password);

    var obj={
        username: req.body.username,
        password: encryptPass,
    }
    data.checkPass(obj, function(ex){
        if(ex){
            console.log('postoji takvo ime  moze se prijavit');
            res.cookie('authx', req.body.username);
            console.log('kreiran kolac redirecta');
            res.redirect('/users');

        }else{
            //ne postoji to ime ne moze se prijaviti
            console.log(' NE postoji takvo ime NE  moze se prijavit');
            res.redirect('/login');
        }
    })



});

module.exports = router;