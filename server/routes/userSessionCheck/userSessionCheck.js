const helper = require('../../utils/helper');
module.exports=(request,response) =>{

			let userId = request.body.userId;
			let sessionCheckResponse = {}
			
			if (userId == '') {

				sessionCheckResponse.error = true;
	            sessionCheckResponse.message = `User Id cant be empty.`;
	            response.status(412).json(sessionCheckResponse);

			}else{

	           	helper.userSessionCheck( { 
	           		userId : userId,
	           	}, (error,result)=>{
	           		
	           		if (error || result === null) {

	           			sessionCheckResponse.error = true;
	            		sessionCheckResponse.message = `Server error.`;
	           			response.status(503).json(sessionCheckResponse);
	           		}else{

	           			sessionCheckResponse.error = false;
	           			sessionCheckResponse.username = result.username;
	           			sessionCheckResponse.reciever=result.reciever;
	            		sessionCheckResponse.message = `User logged in.`;
	            		if(result.profilePhoto){
	            			sessionCheckResponse.profilePhoto=result.profilePhoto;
	            		}
	           			response.status(200).json(sessionCheckResponse);
	           		}
				});
	        }
		}