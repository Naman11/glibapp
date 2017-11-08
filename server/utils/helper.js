
'use strict';
var Helper = /** @class */ (function () {
    function Helper() {
        this.Mongodb = require("./db");
    }
    /*
    * Name of the Method : userNameCheck
    * Description : To check if the username is available or not.
    * Parameter :
    *		1) data query object for MongDB
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.userNameCheck = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').find(data).count(function (err, result) {
                db.close();
                callback(result);
            });
        });
    };
    /*
    * Name of the Method : login
    * Description : login the user.
    * Parameter :
    *		1) data query object for MongDB
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.login = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findAndModify(data, [], { $set: { 'online': 'Y' } }, {}, function (err, result) {
                db.close();
                callback(err, result.value);
            });
        });
    };
    /*
    * Name of the Method : registerUser
    * Description : register the User
    * Parameter :
    *		1) data query object for MongDB
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.registerUser = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').insertOne(data, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };

    Helper.prototype.resetFlag = function (data, callback) {
         this.Mongodb.onConnect(function (db, ObjectID) {
         db.collection('users').update({_id:ObjectID(data.toId),
                                "reciever":{$elemMatch:{fromId:data.fromId}}},
                                {$set:{"reciever.$.flag":0}},{strict:false},
                                function(err,result){
                                    //console.log("incemented falg",result);
                                     db.close();
                                  callback(err, result);
                                }
                                )
         });
    };

    Helper.prototype.setFlag = function (data, callback) {
        console.log("inside helper",data);
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findOne({_id:ObjectID(data.toId)}, function (err, result) {
                console.log("!!!!!!!!!!!!!",result)
                if(result){

                    console.log("result#####################",result);
                    if(result.reciever===undefined)
                    {
                        console.log("here");
                        db.collection("users").update({_id:ObjectID(data.toId)}
                            ,{$addToSet:{"reciever":{"fromId":data.fromId,"flag":1}}},{strict:false}
                            ,function(err,result){
                                console.log("reciever added",result);
                                 db.close();
                             callback(err, result);
                            })
                    }
                    else{
                        console.log("from id array",result.reciever);
                        let fromIdArray=result.reciever.map(i=>i.fromId);
                        console.log("filtered array",fromIdArray);
                        if(fromIdArray.includes(data.fromId)){
                            db.collection('users').update({_id:ObjectID(data.toId),
                                "reciever":{$elemMatch:{fromId:data.fromId}}},
                                {$inc:{"reciever.$.flag":1}},{strict:false},
                                function(err,result){
                                    //console.log("incemented falg",result);
                                     db.close();
                                  callback(err, result);
                                }
                                )
                        }
                        else{
                             db.collection("users").update({_id:ObjectID(data.toId)}
                            ,{$addToSet:{"reciever":{"fromId":data.fromId,"flag":1}}},{strict:false}
                            ,function(err,result){
                                console.log("new reciever added",result);
                                 db.close();
                              callback(err, result);
                            })

                        }
                    }

                }
                // db.close();
                // callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : userSessionCheck
    * Description : to check if user is online or not.
    * Parameter :
    *		1) data query object for MongDB
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.userSessionCheck = function (data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findOne({ _id: ObjectID(data.userId), online: 'Y' }, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : getUserInfo
    * Description : to get information of single user.
    * Parameter :
    *		1) userId of the user
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.getUserInfo = function (userId, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findOne({ _id: ObjectID(userId) }, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : addSocketId
    * Description : Updates the socket id of single user.
    * Parameter :
    *		1) userId of the user
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.addSocketId = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').update({ _id: ObjectID(data.id) }, data.value, function (err, result) {
                db.close();
                callback(err, result.result);
            });
        });
    };
    /*
    * Name of the Method : getChatList
    * Description : To get the list of online user.
    * Parameter :
    *		1) userId (socket id) of the user
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.getChatList = function (userId, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').find({ 'online': 'Y', socketId: { $ne: userId } }).toArray(function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : insertMessages
    * Description : To insert a new message into DB.
    * Parameter :
    *		1) data comprises of message,fromId,toId
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.insertMessages = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            console.log("inside helper insdert messages",data);
            db.collection('messages').insertOne(data, function (err, result) {
                
                db.close();
                callback(err, result);
            });
        });
    };
    Helper.prototype.insertToGeneral = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            console.log(data);
            db.collection('general').insertOne(data, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    Helper.prototype.getfromGeneral = function (callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('general').find({}).toArray(function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };


    /*To get the code snippet from db on click of download button*/
    Helper.prototype.getfromGeneralId = function (data, callback) {
        console.log("This is before db connect");
        this.Mongodb.onConnect(function (db, ObjectID) {
            console.log("In helper Js data",data.codeId);
            db.collection('general').find({"code.codeId":parseInt(data.codeId)}).toArray(function (err, result) {
                console.log("!!!!!!!!!!!!!",result);
                if(result)
                   { 
                    console.log("result#####################",result);
                                             
                 db.close();
                 callback(err, result);
             }
            });
        });
    };

    
    Helper.prototype.getUsers = function (callback) {
        console.log("inside helper get user method");  
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').find({}).toArray(function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    

    /*
    * Name of the Method : getMessages
    * Description : To fetch messages from DB between two users.
    * Parameter :
    *		1) userId, toUserId
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.getMessages = function (userId, toUserId, callback) {
        var data = {
            '$or': [
                { '$and': [
                        {
                            'toUserId': userId
                        }, {
                            'fromUserId': toUserId
                        }
                    ]
                }, {
                    '$and': [
                        {
                            'toUserId': toUserId
                        }, {
                            'fromUserId': userId
                        }
                    ]
                },
            ]
        };
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('messages').find(data).sort({ 'timestamp': 1 }).toArray(function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : getMessages
    * Description : To fetch messages from DB between two users.
    * Parameter :
    *		1) userID
    *		2) callback function
    * Return : callback
    */
    Helper.prototype.logout = function (userID, isSocketId, callback) {
        var data = {
            $set: {
                online: 'N'
            }
        };
        this.Mongodb.onConnect(function (db, ObjectID) {
            var condition = {};
            if (isSocketId) {
                condition.socketId = userID;
            }
            else {
                condition._id = ObjectID(userID);
            }
            db.collection('users').update(condition, data, function (err, result) {
                db.close();
                callback(err, result.result);
            });
        });
    };
    /*
    * Name of the Method : verifyForgotPassword
    * Description : To verify if email exists on database.
    * Parameter :
    *       1) email
    *       2) callback function
    * Return : callback
    */
    Helper.prototype.verifyForgotPassword = function (email, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findOne({"email": email }, function (err, result) {
                //console.log(result);
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : forgotPassword
    * Description : To reset forgotten user Password.
    * Parameter :
    *       1) email
    *       2) passoword
    *       3) callback function
    * Return : callback
    */
    Helper.prototype.forgotPassword = function (email, password, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').update({"email": email },{$set: {"password":password}}, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    
    /*
    * Name of the Method : upateUserData
    * Description : To update user data.
    * Parameter :
    *       1) email
    *       2) data
    *       3) callback function
    * Return : callback
    */
    Helper.prototype.updateUserData = function (params, data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            //console.log(data,objId)
            //console.log(params.oldPassword)
            let paramsObj={}
            //console.log(params.oldPassword)
            if(params.oldPassword){
                console.log("here")
                paramsObj={_id:ObjectID(params.id),password:params.oldPassword};

            }
                else{paramsObj={_id:ObjectID(params.id)};console.log("not here")}
            db.collection('users').updateOne(paramsObj, data/*,{strict:false, upsert:true}*/, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : uploadFileGeneral
    * Description : To upload new file data to General chat Collection.
    * Parameter :
    *       1) data
    *       3) callback function
    * Return : callback
    */
    Helper.prototype.uploadFileGeneral = function ( data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            console.log("inside upload file General helper")
            db.collection('general').insertOne( data/*,{strict:false, upsert:true}*/, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    /*
    * Name of the Method : uploadFileOneOne
    * Description : To upload new file data to Messages chat Collection.
    * Parameter :
    *       1) data
    *       3) callback function
    * Return : callback
    */
    Helper.prototype.uploadFileOneOne = function ( data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            console.log("inside upload file One One helper")
            db.collection('messages').insertOne( data/*,{strict:false, upsert:true}*/, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };
    return Helper;
}());
module.exports = new Helper();
