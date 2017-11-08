'use strict';
const helper = require('../../utils/helper');
//import bcrypt from 'bcrypt-nodejs';

module.exports = (request,response)=>{
	try{
		console.log("hkjdsaZ")
		console.log(request.body)
			let updatePasswordResponse = {}
		let data ={$set:{"password":request.body.newPassword}}
		let params = {"id": request.body.id, "oldPassword":request.body.oldPassword}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			updatePasswordResponse.error = true;
	            		updatePasswordResponse.message = `Server error.`;
	           			response.status(404).json(updatePasswordResponse);
	           		}else{
	           			//console.log(result)
	           			updatePasswordResponse.error = false;
	           			updatePasswordResponse.userId = result;
	            		updatePasswordResponse.message = `User Contact Updated`;
	           			response.status(200).json(updatePasswordResponse);
	           		}
				});
}catch(error){
  res.json({status:false, message: "Server Error",data: error })
}
}