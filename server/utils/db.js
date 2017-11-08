
"use strict";
/*requiring mongodb node modules */
var mongodb = require('mongodb');
var assert = require('assert');
var Db = /** @class */ (function () {
    function Db() {
        this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;
        this.mongoURL = "mongodb://127.0.0.1:27017/local";
    }
    Db.prototype.onConnect = function (callback) {
        var _this = this;
        this.mongoClient.connect(this.mongoURL, function (err, db) {
            assert.equal(null, err);
            callback(db, _this.ObjectID);
        });
    };
    return Db;
}());
module.exports = new Db();