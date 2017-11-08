const helper = require('../../utils/helper');
module.exports=(request,response) =>{
  //console.log("44444444444444444444444444444444444444444444444444",request.body);
	var data={
      toId:request.body.toId,
	 		fromId:request.body.fromId
	 	};
	 helper.resetFlag(data,function(error,result){
	 	
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })



}