  let supertest =require( 'supertest');
  let express  =require( 'express');
  let sinon =require( 'sinon');
  let app  =require( '../app');
  let chai =require( 'chai');
  let expect = require('chai').expect;
  let assert = require('chai').assert;
  let should = require('chai').should();
  const helper = require('../utils/helper');
  let server = supertest(app);
  let stubUpdate=sinon.stub(helper, 'updateUserData')
  let sinonForgetPass=sinon.stub(helper,'verifyForgotPassword');
  let sinonforgotPassword=sinon.stub(helper,'forgotPassword');
  let sinonGeneral=sinon.stub(helper,'insertToGeneral');
  let sinonGetGeneral=sinon.stub(helper,'getfromGeneral');
  let sinonGetIdGeneral=sinon.stub(helper,'getfromGeneralId');
  let sinonGetUserInfo=sinon.stub(helper,'getUserInfo');
  let config=require('../config/appTest.config');

//=================Test Suite for registeration of new user===============================================================================================//
  describe('Registeration User Test cases ',()=>{
    before(function (done) {
      sinon.stub(helper, 'registerUser').yields(null,config.registerUserTest);
      done();
    });
//=================Test Case to check registeration of a new user===============================================================================================//    
    it('should register a new user',(done)=>{
      server
      .post('/registerUser')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.sendRegisterResponse)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.success)
        done();
      });
    });

//=================Test Case to check if user name is empty then user should unable to register=========================================================================//
    it('should  not register a new user if user name is empty ',(done)=>{
      server
      .post('/registerUser')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.sendNegativeRegisterResponse)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.failure);
        done();
      });
    });

//=================Test Case to check if user email is empty then user should unable to register=========================================================================//
      it('should  not register a new user if email is empty ',(done)=>{
      server
      .post('/registerUser')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.sendNegativeEmailResponse)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.emailFailure);
        done();
      });
    });

//=================Test Case to check if password is empty then user should unable to register=========================================================================//
     it('should  not register a new user if password is empty ',(done)=>{
      server
      .post('/registerUser')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.sendNegativePasswordResponse)
      .end((err,res)=>{ 
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.passwordFailure);
        done();
      });
    });
  });

//================== Test Suite for logging into application==============================================================================================================//
  describe('Login  User Test cases ',()=>{
    before(function (done) {
      sinon.stub(helper, 'login').yields(null, config.loginUser);
      done();
    });

//=================Test Case to check if user name is empty then user should unable to register=========================================================================//
     it('should Login an existing  user',(done)=>{
      server
      .post('/login')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.loginUserNegative)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.login);
        res.body.userId.should.be.equal(config.response.loginId);
        done();
      });
    });

//=================Test Case to check logging into application=========================================================================//
     it('user should login',(done)=>{
      server
      .post('/login')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.loginUserNegative)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.login);
        res.body.userId.should.be.equal(config.registerUserTest.id);
        done();
      });
    });

//=================Test Case to check user should not login  if username is empty =========================================================================//
    it('user should not login if username is empty',(done)=>{
      server
      .post('/login')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.loginUserEmpty)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        done();
      });
    });

//=================Test Case to check user should not login if password is empty=========================================================================//
   it('user should not login',(done)=>{
      server
      .post('/login')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.loginPasswordEmpty)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        done();
      });
    });
  });

//===============Test Suite for get messages of chats=========================================================================================================//
  describe(' Test cases for getting chat messages ',()=>{
    before(function (done) {
      sinon.stub(helper, 'getMessages').yields(null,config.chatResponse);
      done();
    });

//=================Test Case to check getting chat messages between two users=========================================================================//
    it('getting chat messages between two users',(done)=>{
      server
      .post('/getMessages')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.chatResponse)
      .end((err,res)=>{
        res.error.should.be.equal(false);
        res.body.messages.message.should.be.equal(config.response.chatResult);
        done();
      });
    });

//=================Test Case to check not getting chat messages between two users=========================================================================//
     it(' should not get chat messages between two users',(done)=>{
      server
      .post('/getMessages')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.chatSendEmptyUserId)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.userIdEmpty);
        done();
      });
    });
  });

//======================== Test Suite for User Name Check===================================================================================//
  describe('Test cases for user name Check ',()=>{
    before(function (done) {
      sinon.stub(helper,'userNameCheck').yields(null, config.loginUser);
      done();
    });

//======================== Test Case for User Name Check===================================================================================//
     it('should check the registerd user name',(done)=>{
      server
      .post('/usernameCheck')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.loginUser)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        done();
      });
    });

//======================== Test Case to check if username is blank===================================================================================//
     it('should check if username is blank',(done)=>{
      server
      .post('/usernameCheck')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.emptyUserName)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        done();
      });
    });
  });

//====================== Test Suite  for user session check===============================================================================//  
  describe('Test cases for user session Check ',()=>{
    before(function (done) {
      sinon.stub(helper, 'userSessionCheck').yields(null,config.sessionCheckResponse);
      done();
    });
 //====================== Test Case for user session check===============================================================================//  
    it('should check the  session of registerd user',(done)=>{
      server
      .post('/userSessionCheck')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.userId)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.username.should.be.equal(config.response.username);
        res.body.message.should.be.equal(config.response.login);
        done();
      });
    });

//====================== Test Case to check should  not check the  session of registerd user if id is blank===============================================================================//  
     it('should  not check the  session of registerd user if id is blank',(done)=>{
      server
      .post('/userSessionCheck')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.emptyUserId)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.emptyUserIdResponse);
        done();
      });
    });
  })

//========================Test Suite for new messages notifications====================================================================================================//
  describe('Test cases for new messages notifications ',()=>{
    before(function (done) {
      sinon.stub(helper, 'resetFlag').yields(null,config.messageNotification);
      sinon.stub(helper, 'setFlag').yields(null,config.messageNotification);
      done();
    });

//========================Test Case for new messages notifications====================================================================================================//
     it('should reset the count after reading message',(done)=>{
      server
      .put('/users')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.messageSendResponse)
      .end((err,res)=>{
        res.body.nModified.should.be.equal(config.response.n);
        res.body.n.should.be.equal(config.response.n);
        done();
      });
    });

//=========Test Case to check setting the count before reading message====================================================================================================//
     it('should set the count before reading message',(done)=>{
      server
      .post('/users')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.response.messageSendResponse)
      .end((err,res)=>{
        res.body.nModified.should.be.equal(config.response.n);
        res.body.n.should.be.equal(config.response.n);
        done();
      });
    });
  });

//===================Test Suite for scrapping the url=====================================================================//
  describe('test cases for scrapping the url',()=>{
 
 //===================Test Case for scrapping the url=====================================================================//
     it('scrapping the data',(done)=>{
      server
      .post('/unfurl')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.url)
      .end((err,res)=>{
        res.body.other.icon.should.be.equal(config.icon);
        res.body.other.search.should.be.equal(config.search);
        done();
      });
    });
  });

//===================Test Suite for Update UserData isOnline=====================================================================//
  describe('Update UserData isOnline Test cases ',()=>{

//===================Test Case to check should be online=====================================================================//
    it('should be online',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/isOnline')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.iD)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal('User is now Online');
        res.body.userId.should.be.equal(config.id);
        done();
      });
    });
//===================Test Case to check if user id not found=====================================================================//
    it('user id not found',(done)=>{
      stubUpdate.yields(null,null);
      server
      .post('/updateUserData/isOnline')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({id:'123'})
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });
//===================Test Suite if Update UserData isOffline=====================================================================//
  describe('Update UserData isOffline Test cases ',()=>{
//===================Test Case to check should be offline=====================================================================//
    it('should be offline',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/isOffline')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.iD)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.userOffline);
        res.body.userId.should.be.equal(config.id);
        done();
      });
    });
//===================Test Case if user id is not found=====================================================================//
    it('user id not found',(done)=>{
      stubUpdate.yields(null,null);
      server
      .post('/updateUserData/isOffline')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.iD)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });

//===================Test Suite if Update UserData contact =====================================================================//
  describe('Update UserData contact Test cases ',()=>{
//===================Test Case if user id found for contact update=====================================================================//
    it('user id found for contact update',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/updateContact')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idContact)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.contactUpdated);
        res.body.userId.should.be.equal(config.id);
        done();
      });
    });
//===================Test Case if user id not found for contact update=====================================================================//
    it('user id not found for contact update',(done)=>{
      stubUpdate.yields(null,null);
      server
      .post('/updateUserData/updateContact')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idContact)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });

//===================Test Suite Update UserData password =====================================================================//
  describe('Update UserData password Test cases ',()=>{
//===================Test Case user id found for password update =====================================================================//
    it('user id found for password update',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/updatePassword')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idPassword)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.contactUpdated);
        res.body.userId.should.be.equal(config.id);
        done();
      });
    });

//===================Test Case user id not found for password update =====================================================================//
    it('user id not found for password update',(done)=>{
      stubUpdate.yields(null,null);
      server
      .post('/updateUserData/updatePassword')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idPassword)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });

//===========Test Suite for Update UserData status  =============================================================//
  describe('Update UserData status Test cases ',()=>{

//===========Test Case for user id found for status update =============================================================//
    it('user id found for status update',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/updateStatus')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idStatus)
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.statusUpdated);
        res.body.userId.should.be.equal(config.id);
        done();
      });
    });

//===========Test Case for user id not found for status update =============================================================//
    it('user id not found for status update',(done)=>{
      stubUpdate.yields(null,null);
      server
      .post('/updateUserData/updateStatus')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.idStatus)
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });

//===========Test Suite for Update UserData profilePicture Test cases =============================================================//
  describe('Update UserData profilePicture Test cases ',()=>{

//===========Test Case user id found for profile picture update =============================================================//
    it('user id found for profile picture update',(done)=>{
      stubUpdate.yields(null,config.id);
      server
      .post('/updateUserData/updateProfilePhoto/123')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.profilePhoto)
      .end((err,res)=>{
        res.body.status.should.be.equal(false);
        res.body.message.should.be.equal(config.response.serverErrors);
        done();
      });
    });
  });

//===================Test Suite for File Transfer one to one =============================================================//
  describe('File Transfer one to one Test cases ',()=>{

//===================Test Suite to check error occured in file transfer =============================================================//
    it('error occured in file transfer',(done)=>{
      server
      .post('/fileTransfer/uploadFileOneOne/123/456')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });
  });

//===================Test Suite for File Transfer general =============================================================//
  describe('File Transfer general Test cases ',()=>{

//===================Test Cases to check error occured in file transfer=============================================================//
    it('error occured in file transfer',(done)=>{
      server
      .post('/fileTransfer/uploadFileGeneral/kuldeep')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.status.should.be.equal(false);
        res.body.message.should.be.equal(config.response.serverErrors);
        done();
      });
    });
  });
//===================Test Suite for ForgetPassword Test cases=============================================================//
  describe('ForgetPassword Test cases ',()=>{

//===================Test Case for user email does not exists=============================================================//
    it('user email does not exists',(done)=>{
      sinonForgetPass.yields(null,null);
      server
      .get('/forgotPass/kuldeepkhare@gmail.com')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });

//==========Test Case for user email exists and password change verified=============================================================//
    it('user email exists and password change verified',(done)=>{
      sinonForgetPass.yields(null,config.id);
      server
      .get('/forgotPass/kuldeepkhare@gmail.com')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.queryComplete);
        res.body.result.should.be.equal(config.id);
        done();
      });
    });
  });

//===================Test Suite for ChangePassword=============================================================//
  describe('ChangePassword Test cases ',()=>{
//===================Test Case for user email does not exists=============================================================//
    it('user email does not exists',(done)=>{
      sinonforgotPassword.yields(null,null);
      server
      .put('/forgotPass')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal(config.response.serverError);
        done();
      });
    });

//===================Test Case for user email exists and password updated=============================================================//
    it('user email exists and password updated',(done)=>{
      sinonforgotPassword.yields(null,config.id);
      server
      .put('/forgotPass')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal(config.response.passwordUpdated);
        done();
      });
    });
  });
//===================Test Suite for addGener=============================================================//
  describe('Adding code to general channel',()=>{
//=====================Test Case to check Code Added to general channel===========================================//
    it('Code Added to general channel',(done)=>{
      sinonGeneral.yields(null,config.okN);
      server
      .post('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.codeResponse)
      .end((err,res)=>{
        res.body.ok.should.be.equal(config.response.nResponse);
        done();
      });
    });
//==========Test Case to check Code Addedto general channel===========================================//  
    it('Added Code to general channel',(done)=>{
      sinonGeneral.yields(null,config.okN);
      server
      .post('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.codeResponse)
      .end((err,res)=>{
        res.body.n.should.be.equal(config.response.nResponse);
        done();
      });
    });

//==========Test Case to check Code Added Unsuccesfull to general channel===========================================//  
it('Code Adding Unsuccesfull to general channel',(done)=>{
      sinonGeneral.yields(null,config.okN);
      server
      .post('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.codeResponse)
      .end((err,res)=>{
        res.body.ok.should.not.be.equal(config.response.zero);
        done();
      });
    });

//==========Test Case to check Code Added Unsuccesfull to general channel===========================================//  
it('Adding Code to general channel Unsuccesfull',(done)=>{
      sinonGeneral.yields(null,config.okN);
      server
      .post('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.codeResponse)
      .end((err,res)=>{
        res.body.n.should.not.be.equal(config.response.zero);
        done();
      });
    });
});

//===================Test Suite for get general=============================================================//
  describe('Getting code from general channel',()=>{
//=====================Test Case to check Code Retrieved from general channel===========================================//
    it('Code retrieved from general channel',(done)=>{
      sinonGetGeneral.yields(null,config.generalCodeResponse
);
      server
      .get('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send(config.generalCodeResponse)
      .end((err,res)=>{
        res.body.username.should.be.equal(config.generalCodeResponse.username);
        res.body.timestamp.should.be.equal(config.generalCodeResponse.timestamp);
        res.body.code.codeId.should.be.equal(config.generalCodeResponse.code.codeId);
        res.body.code.title.should.be.equal(config.generalCodeResponse.code.title);
        res.body.code.code.should.be.equal(config.generalCodeResponse.code.code);
        res.body.code.comment.should.be.equal(config.generalCodeResponse.code.comment);
        res.body.code.language.should.be.equal(config.generalCodeResponse.code.language);
        res.body.code.username.should.be.equal(config.generalCodeResponse.username);
        done();
      });
    });
//=====================Test Case to check Code not retrieved from general channel===========================================//
    it('Code not retrieved from general channel',(done)=>{
      sinonGetGeneral.yields(null,{"message":config.generalCodeResponseN.message});
      server
      .get('/generalChats')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({"message":config.generalCodeResponseN.message})
      .end((err,res)=>{
        res.body.message.should.be.equal(config.generalCodeResponseN.message);
        done();
      });
    });
});
//===================Test Suite for getCode from general=============================================================//
  describe('codeId found from general channel',()=>{
//=============Test Case to check Code Retrieved from general channel===========================================//
    it('Code retrieved',(done)=>{
      sinonGetIdGeneral.yields(null,config.generalCodeResponse);
      server
      .get('/generalChats/Id/456')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({})
      .end((err,res)=>{
        res.body.username.should.be.equal(config.generalCodeResponse.username);
        res.body.timestamp.should.be.equal(config.generalCodeResponse.timestamp);
        res.body.code.codeId.should.be.equal(config.generalCodeResponse.code.codeId);
        res.body.code.title.should.be.equal(config.generalCodeResponse.code.title);
        res.body.code.code.should.be.equal(config.generalCodeResponse.code.code);
        res.body.code.comment.should.be.equal(config.generalCodeResponse.code.comment);
        res.body.code.language.should.be.equal(config.generalCodeResponse.code.language);
        res.body.code.username.should.be.equal(config.generalCodeResponse.username);
        done();
      });
    });
//=====================Test Case to check Code not retrieved from general channel===========================================//
    it('CodeId not found ',(done)=>{
      sinonGetIdGeneral.yields(null,{"message":config.generalCodeResponseN.message});
      server
      .get('/generalChats/Id/456')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({"message":config.generalCodeResponseN.message})
      .end((err,res)=>{
        res.body.message.should.be.equal(config.generalCodeResponseN.message);
        done();
      });
    });
});
//===================Test Suite for getting user information=============================================================//
  describe('Getting user information ',()=>{
//===================Test Case for user email does not exists=============================================================//
    it('User Found',(done)=>{
      sinonGetUserInfo.yields(null,{result:config.id});
      server
      .post('/getUserInfo')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({"id":config.id})
      .end((err,res)=>{
        res.body.result.result.should.be.equal(config.id);
        done();
      });
    });

//===================Test Case for user email exists and password updated=============================================================//
    it('User not found',(done)=>{
      sinonGetUserInfo.yields(null,null);
      server
      .post('/getUserInfo')
      .expect(200)
      .expect('Content-Type',/json/)
      .send({"id":config.id})
      .end((err,res)=>{
       res.body.error.should.be.equal(true);
       res.body.message.should.be.equal(config.response.serverError);
       done();
      });
    });
  });
