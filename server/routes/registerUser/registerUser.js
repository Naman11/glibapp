//import express from 'express';
'use strict';

const helper = require('../../utils/helper');
module.exports=(request,response) =>{

			const data = {
				username : (request.body.username).toLowerCase(),
				email : request.body.email,
				password : request.body.password
			};

			let registrationResponse = {}

			if(data.username === '') {

	            registrationResponse.error = true;
	            registrationResponse.message = `username cant be empty.`;
	            response.status(412).json(registrationResponse);

	        }else if(data.email === ''){
				            
	            registrationResponse.error = true;
	            registrationResponse.message = `email cant be empty.`;
	            response.status(412).json(registrationResponse);

	        }else if(data.password === ''){
				            
	            registrationResponse.error = true;
	            registrationResponse.message = `password cant be empty.`;
	            response.status(412).json(registrationResponse);

	        }else{
	        	
	        	data.timestamp = Math.floor(new Date() / 1000);
				data.online = 'Y' ;
				data.socketId = '' ;

	           	helper.registerUser( data, (error,result)=>{

	           		if (error) {

           				registrationResponse.error = true;
	            		registrationResponse.message = `Server error.`;
	           			response.status(404).json(registrationResponse);
	           		}else{

	           			registrationResponse.error = false;
	           			registrationResponse.userId = result.insertedId;
	            		registrationResponse.message = `User registration successful.`;
	           			response.status(200).json(registrationResponse);
	           		}
				});
	        }
		}