'use strict';

const helper = require('../../utils/helper');
module.exports=(request,response) =>{

			const data = {
				username : (request.body.username).toLowerCase(),
				password : request.body.password
			};

			let loginResponse = {}

			if(data.username === '' || data.username === null) {

	            loginResponse.error = true;
	            loginResponse.message = `username cant be empty.`;
	            response.status(412).json(loginResponse);

	        }else if(data.password === '' || data.password === null){
				            
	            loginResponse.error = true;
	            loginResponse.message = `password cant be empty.`;
	            response.status(412).json(loginResponse);

	        }else{

	           	helper.login( data, (error,result)=>{

	           		if (error || result === null) {

	           			loginResponse.error = true;
	            		loginResponse.message = `Server error.`;
	           			response.status(404).json(loginResponse);
	           		}else{
	           			loginResponse.error = false;
	           			loginResponse.userId = result._id;
	            		loginResponse.message = `User logged in.`;
	           			response.status(200).json(loginResponse);
	           		}
				});
	        }
		}