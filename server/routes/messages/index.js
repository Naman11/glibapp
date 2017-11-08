const express = require("express");
let getMessages=require('./getMessages');
let router=express.Router();
router.post('/',getMessages);
module.exports=router;