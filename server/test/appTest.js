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


//Test cases for registeration of new user
describe('Registeration User Test cases ',()=>{
  let connected_db;
  let collection;
  before(function (done) {
  sinon.stub(helper, 'registerUser').yields(null, {"username":"Anurag","email":"vatsya.anurag@gmail.com","password":"manu",id:'21fhdk39338'});

    done();
  });
  it('should register a new user',(done)=>{
  	server
  	.post('/registerUser')
    .expect(200)
    .expect('Content-Type',/json/)
    .send({username:'Anurag',email:'vatsya.anurag@.com',password:'mklkk'})
    .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal('User registration successful.')
        done();
    });
  });
  it('should  not register a new user if user name is empty ',(done)=>{
    server
    .post('/registerUser')
    .expect(200)
    .expect('Content-Type',/json/)
    .send({username:'',email:'vatsya.anurag@.com',password:'mklkk'})
    .end((err,res)=>{
      console.log("error is here", res.body.error)
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal('username cant be empty.');
        done();
    });
  });
  it('should  not register a new user if email is empty ',(done)=>{
    server
    .post('/registerUser')
    .expect(200)
    .expect('Content-Type',/json/)
    .send({username:'anurag',email:'',password:'mklkk'})
    .end((err,res)=>{
      console.log("error is here", res.body.error)
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal('email cant be empty.');
        done();
    });
  });
  it('should  not register a new user if password is empty ',(done)=>{
    server
    .post('/registerUser')
    .expect(200)
    .expect('Content-Type',/json/)
    .send({username:'anurag',email:'nishnat@gmail.com',password:''})
    .end((err,res)=>{
      console.log("error is here", res.body.error)
        res.body.error.should.be.equal(true);
        res.body.message.should.be.equal('password cant be empty.');
        done();
    });
  });
});

// Test cases for logging into application

describe('Registeration User Test cases ',()=>{
  let connected_db;
  let collection;
  before(function (done) {
  sinon.stub(helper, 'login').yields(null, {"username":"Anurag","password":"manu",_id:'21fhdk39338'});

    done();
  });
  it('should register a new user',(done)=>{
    server
    .post('/login')
    .expect(200)
    .expect('Content-Type',/json/)
    .send({username:'Anurag',password:'mklkk'})
    .end((err,res)=>{
        res.body.error.should.be.equal(false);
        res.body.message.should.be.equal('User logged in.');
        res.body.userId.should.be.equal('21fhdk39338');
        done();
    });
  });
  });

