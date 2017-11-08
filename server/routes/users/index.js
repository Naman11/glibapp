const express = require("express");
let setFlag=require('./setFlag');
let resetFlag=require('./resetFlag');
let router=express.Router();
router.post('/',setFlag);
router.put('/',resetFlag);
module.exports=router;