'use strict';
/*===================  load up the user model ==============================================*/
const helper = require('../../utils/helper');
module.exports = (request,response)=>{
try{
	

	let getUserInfoResponse = {};
	helper.getUserInfo( request.body.id, (error,result)=>{

	           		if (error || result === null) {

	           			getUserInfoResponse.error = true;
	            		getUserInfoResponse.message = `Server error.`;
	           			response.status(404).json(getUserInfoResponse);
	           		}else{
	           			
	           			getUserInfoResponse.error = false;
	           			getUserInfoResponse.result = result;
	            		getUserInfoResponse.message = `Query Complete`;
	           			response.status(200).json(getUserInfoResponse);
	           		}
				});


}catch(error){
  res.json({status:false, message: "Server Error",data: error })
}
}