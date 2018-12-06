var express = require('express');
var router = express.Router();



//GET home
router.get('/',(req,res)=>{
    res.render('home');
})




module.exports = router;