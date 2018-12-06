//u ovom fajlu ce se nalaziti lista korisnika i sve funkcije koje obraduju podatke liste na bilo kakav nacin
const db = require('../models/models');
var crypto = require('crypto');
var check = function(user, mess){

    db.Users.find({
        where: {
            username: user
        }
    }).then(e => {
        if (e == null) {
            mess(false)
        } else {
            mess(true)
        }
    });
}

var addUser = function(obj,regFunction){
    db.Users.create({username: obj.username, password: obj.password})

        .catch(err => {
            return console.log(err.message);
        }).then(res => {
        //dodat user
        regFunction();//pravi kolacic i redirecta na user-ov profil
    });


}

var encrypt = (password)=>{
    var hash = crypto.createHash('sha256');


    hash.update(password);
    return hash.digest('hex');
}
var checkPass = (obj,mess)=>{
    db.Users.find({
        where: {
            username: obj.username,
            password: obj.password
        }
    }).then(e => {
        if (e == null) {
            mess(false)
        } else {
            mess(true)
        }
    });
}
var getUserID = async (username)=>{
    console.log('funkcija getuserid trazi id');
    var user = await db.Users.findAll(
        {where: {
            username: username
        }, limit: 1})
        .then(resk => {
        return resk;
    });
    console.log('ovo je user   ', user);
    var id = user[0].dataValues.id;
    console.log('ovo je id ',id);
    return id;

}
var getTask= async (username,taskFunction)=> {
    console.log('trazi id');
    var id = await getUserID(username);
    console.log('pronasla id ',id);
    console.log('trazi id u tabeli taskova');
    db.Todo.findAll({
        where: {
            id_username: id
        }}).catch(err => {
        console.log(err.message);
    }).then(rows => {
        console.log('zavrsena fja findall',rows);
        var todoList = [];
            rows.forEach(function (row) {
                console.log(row);
                todoList.push(row.dataValues.task);
            });


        console.log('sad se poziva fja');
        //var testlista=['task1','task2'];
        taskFunction(todoList);
    })

}

var addTask = async (username,task,fun)=>{
    var id = await getUserID(username);

    db.Todo.create({id_username: id, task: task})
        .catch(err => {
            console.log(console.error);
            return console.log(err.message);
        })
        .then(row => {
            console.log("Task uspjesno dodat u tabelu");
            fun();
        })
}
module.exports = {
    check,
    checkPass,
    addUser,
    encrypt,
    getTask,
    addTask

};