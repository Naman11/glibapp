const express = require("express");
let userNameCheck=require('./userNameCheck');
let router=express.Router();
router.post('/',userNameCheck);
module.exports=router;