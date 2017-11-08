const express = require("express");
let addgeneral =require('./addGener');
let getgeneral=require('./getGeneral');
let getcode = require('./getCode');

// let getChats=require('./getGeneralChats');
// let addChats=require('./addGeneralChats');
// let saveCode=require('./addCode');
// let getCode=require('./getCode');

// let getGeneral = require('./addGeneral');

let router=express.Router();
// router.get('/',getChats);
// router.get('/getcode',getCode);
// router.post('/',addChats);
// router.post('/savecode',saveCode);
router.post('/',addgeneral);
router.get('/',getgeneral);
router.get('/Id/:codeId',getcode);
module.exports=router;