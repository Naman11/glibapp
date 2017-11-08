const express = require("express");

let userSessionCheck=require('./userSessionCheck')
let router=express.Router();
router.post('/',userSessionCheck);
module.exports=router;