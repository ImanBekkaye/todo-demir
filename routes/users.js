var express = require('express');
var router = express.Router();
var data = require('../helpers/data');

//var task = require(../)
//GET users
router.get('/', function(req, res, next){

    data.getTask(req.cookies.authx,function(todoLista){
            console.log('salje se lista', todoLista);
            res.render('profile', {
                data: {
                    username: req.cookies.authx,
                    password: 'dgg',
                    todoList: todoLista
                }
            });

    });

});

//POST users-hendla dodavanje taska
router.post('/',function(req, res, next){

    var type = req.body.requestType;
    console.log('tip', type);
    var username = req.cookies.authx;
    var task = req.body.task;

        console.log('task se dodaje');
        data.addTask(username,task,function(){
            res.redirect('/users');
        });


})



module.exports = router;
