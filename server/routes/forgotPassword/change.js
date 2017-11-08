'use strict';

/*======================= importing all the files we need ==================================*/
const helper = require('../../utils/helper');
//var bcrypt = require('bcrypt-nodejs');

module.exports = (request,response) => {
	try{
		let forgotPasswordResponse = {}
		//let collection = db.Db().collection('users');
		/*let afterHashPassword = bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return res.status(404).json({
					success : false,
					message : "bcrypt genSalt error " + err 
				});
			}
			bcrypt.hash(req.body.password, salt,null, function(err, hash) {
				if (err) {
					return res.status(404).json({
						success : false,
						message : "bcrypt hash error " + err 
					});
				}
				afterHashPassword = hash;
				
				collection.update({
					"email" : req.body.email
				},
				{$set: {"password":afterHashPassword}},
				(err,userdata)=>{
					if(err){
						res.status(404).json({
							success : false,
							message : "Bad Request " + err
						});
					} else{
						console.log(userdata);
						res.status(201).send(userdata);
					}
				});
      	//return afterHashPassword;
      });
		});*/

		helper.forgotPassword( request.body.email, request.body.password, (error,result)=>{

	           		if (error || result === null) {

	           			forgotPasswordResponse.error = true;
	            		forgotPasswordResponse.message = `Server error.`;
	           			response.status(404).json(forgotPasswordResponse);
	           		}else{
	           			console.log(result.result)
	           			forgotPasswordResponse.error = false;
	           			forgotPasswordResponse.userId = result.result;
	            		forgotPasswordResponse.message = `Password Updated`;
	           			response.status(200).json(forgotPasswordResponse);
	           		}
				});
	}catch(error){
		response.json({status:false, message: "Server Error",data: error })
	}
}