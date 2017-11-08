const express = require("express");
let registerUser=require('./registerUser');
let router=express.Router();
router.post('/',registerUser);
module.exports=router;