/*===================== load all the files we need ========================================*/
const express = require('express');
let updatePassword = require('./updatePassword');
let updateContact = require('./updateContact');
let updateProfilePhoto = require('./updateProfilePhoto');
let updateStatus = require('./updateStatus');
let isOnline = require('./isOnline');
let isOffline = require('./isOffline');
//import passport from 'passport';

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.post('/updatePassword',updatePassword);
router.post('/updateContact',updateContact);
router.post('/updateProfilePhoto/:id',updateProfilePhoto);
router.post('/updateStatus',updateStatus);
router.post('/isOnline',isOnline);
router.post('/isOffline',isOffline);


module.exports=router;
