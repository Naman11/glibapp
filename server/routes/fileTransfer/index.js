/*===================== load all the files we need ========================================*/
const express = require('express');
let uploadFileGeneral = require('./uploadFileGeneral');
let uploadFileOneOne = require('./uploadFileOneOne');
//let downloadFile = require('./downloadFile');
//import passport from 'passport';

let router=express.Router();
/*=====================     providing routers    ========================================*/

router.post('/uploadFileGeneral/:username',uploadFileGeneral);
router.post('/uploadFileOneOne/:fromID/:toID',uploadFileOneOne);
//router.post('/downloadFile',downloadFile);

module.exports=router;
