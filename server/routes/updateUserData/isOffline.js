/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

module.exports = (request,response)=>{
	try{

		let isOfflineResponse = {}
		let data ={$set:{"isActive":false}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			isOfflineResponse.error = true;
	            		isOfflineResponse.message = `Server error.`;
	           			response.status(404).json(isOfflineResponse);
	           		}else{
	           			//console.log(result)
	           			isOfflineResponse.error = false;
	           			isOfflineResponse.userId = result;
	            		isOfflineResponse.message = `User is now Offline`;
	           			response.status(200).json(isOfflineResponse);
	           		}
				});
		
}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}

