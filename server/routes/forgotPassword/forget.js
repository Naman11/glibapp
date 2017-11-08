/*===================== load all the files we need ========================================*/
'use strict';
/*===================  load up the config file ==============================================*/
const helper = require('../../utils/helper');

module.exports = (request,response) => { 
	
//Calling find function
try
{

	let verifyForgotPasswordResponse = {};
	helper.verifyForgotPassword( request.params.email, (error,result)=>{

	           		if (error || result === null) {

	           			verifyForgotPasswordResponse.error = true;
	            		verifyForgotPasswordResponse.message = `Server error.`;
	           			response.status(404).json(verifyForgotPasswordResponse);
	           		}else{
	           			//console.log(result.username)
	           			verifyForgotPasswordResponse.error = false;
	           			verifyForgotPasswordResponse.result = result;
	            		verifyForgotPasswordResponse.message = `Query Complete`;
	           			response.status(200).json(verifyForgotPasswordResponse);
	           		}
				});

}catch(error){
	response.json({status:false, message: "Server Error fronm forget",data: error })
}
}





