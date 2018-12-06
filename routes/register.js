var express = require('express');
var router = express.Router();
var data = require('../helpers/data');


//GET register
router.get('/',(req, res)=>{
    res.render('register');
})

//POST register
router.post('/',function(req,res, next){

    var encryptPass = data.encrypt(req.body.password);
    var obj={
            username: req.body.username,
            password: encryptPass,
        }
        data.check(obj.username, function(ex){
            if(ex){
                console.log('postoji takvo ime ne moze se registrovati');
                res.redirect('/register');
            }else{
                //ne postoji to ime moze se registrovati tj. takav user se dodaje u bazu
                data.addUser(obj,()=>{
                    res.cookie('authx', req.body.username);
                    console.log('kreiran kolac redirecta');
                    res.redirect('/users');
                })
            }
        })
        //dodati usera ako moze


})





module.exports = router;
