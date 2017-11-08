const express = require("express");
let login=require('./login');
let router=express.Router();
router.post('/',login);
module.exports=router;