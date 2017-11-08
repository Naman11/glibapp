/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

module.exports = (request,response)=>{
	try{

		let isOnlineResponse = {}
		let data ={$set:{"isActive":true}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			isOnlineResponse.error = true;
	            		isOnlineResponse.message = `Server error.`;
	           			response.status(404).json(isOnlineResponse);
	           		}else{
	           			//console.log(result)
	           			isOnlineResponse.error = false;
	           			isOnlineResponse.userId = result;
	            		isOnlineResponse.message = `User is now Online`;
	           			response.status(200).json(isOnlineResponse);
	           		}
				});
		
}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}

