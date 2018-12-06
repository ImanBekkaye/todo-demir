const db = require('../helpers/data');
//funkcija provjerava da li user iz kolacica postoji u bazi
//to ce provjeriti tako sto cemo pozvat finkciju za provjeru

var authorization = function(req, res, next){
console.log('provjera rute');
    if(req.cookies.authx){
        if(req.path == '/' || req.path == '/home' || req.path == '/login' || req.path == '/register'){
        res.redirect('/users');

        }else {
            //provjera da li postoji taj username u bazi
           /* db.check(req.cookies.authx, function(ex){
                if(ex){
                    console.log("Postoji u bazi");
                    res.redirect('/users');

                } else{
                    console.log("Ne postoji u bazi");
                    console.log('midlver pao');
                    res.redirect('/home');
                }
            });*/

            next();

        }
    }else{
        if(req.path != '/' && req.path != '/home' && req.path != '/login' && req.path != '/register'){
            res.redirect('/home');
            next();
        }

        next();

    }

}

module.exports = authorization;