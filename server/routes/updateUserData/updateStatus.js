
/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

module.exports = (request,response)=>{
	//console.log("routes", request.body.id);
	try{

		let updateStatusResponse = {}
		/*var data = {
                id: request.body.id,
                value: {
                    $set: {
                        
                        "status":request.body.status
                    }
                }
            };*/
		let data ={$set:{"status":request.body.status}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			updateStatusResponse.error = true;
	            		updateStatusResponse.message = `Server error.`;
	           			response.status(404).json(updateStatusResponse);
	           		}else{
	           			//console.log(result)
	           			updateStatusResponse.error = false;
	           			updateStatusResponse.userId = result;
	            		updateStatusResponse.message = `User Status Updated`;
	            		console.log(updateStatusResponse.message);
	           			response.status(200).json(updateStatusResponse);
	           		}
				});
		
}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}

