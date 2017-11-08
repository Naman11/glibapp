const helper = require('../../utils/helper');
module.exports=(request,response) =>{

			let userId = request.body.userId;
			let toUserId = request.body.toUserId;
			let messages = {}
			
			if (userId == '') {
				messages.error = true;
	            messages.message = `userId cant be empty.`;
	            response.status(200).json(messages);
			}else{

	           	helper.getMessages( userId, toUserId, (error,result)=>{

          			if (error) {

	           			messages.error = true;
	            		messages.message = `Server error.`;
	           			response.status(200).json(messages);

	           		}else{

	           			messages.error = false;
	            		messages.messages = result;
	           			response.status(200).json(messages);
	           		}
				});
	        }
		}