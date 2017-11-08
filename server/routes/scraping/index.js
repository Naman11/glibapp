const express = require("express");
let scraping= require("./scraping");
let unfurl = require("unfurl.js");
let router=express.Router();
router.post('/',scraping);
module.exports=router;