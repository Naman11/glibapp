
/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

module.exports = (request,response)=>{
	try{

		let updateContactResponse = {}
		let data ={$set:{"contact":request.body.contact}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			updateContactResponse.error = true;
	            		updateContactResponse.message = `Server error.`;
	           			response.status(404).json(updateContactResponse);
	           		}else{
	           			//console.log(result)
	           			updateContactResponse.error = false;
	           			updateContactResponse.userId = result;
	            		updateContactResponse.message = `User Contact Updated`;
	           			response.status(200).json(updateContactResponse);
	           		}
				});
		
}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}

