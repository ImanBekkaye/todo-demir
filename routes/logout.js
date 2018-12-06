var express = require('express');
var router = express.Router();

//GET logout
router.get('/',function(req,res,next){
    res.clearCookie("authx");
    console.log('brisanje kolacica');
    res.redirect('/home');
});

module.exports = router;