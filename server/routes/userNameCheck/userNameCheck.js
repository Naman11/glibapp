const express = require("express");
const helper = require('../../utils/helper');
module.exports=(request,response) =>{

			if (request.body.username === "") {
				response.status(412).json({
					error : true,
					message : `username cant be empty.`
				});
			} else {
				helper.userNameCheck( {
					username : request.body.username.toLowerCase()
				}, (count)=>{

					let result = {};
					
					if (count > 0) {
						result.error = true;
					} else {
						result.error = false;
					}
					response.status(200).json(result);
				});
			}
		}