const helper = require('../../utils/helper');
module.exports=(request,response) =>{
  let id = request.params.codeId;
  console.log("This is getCode", id);
	let data={
      codeId:id
	 	}
    console.log("This is serve get Code", data);
       helper.getfromGeneralId(data,function(error,result){
         
                    if(error){
    
                            response.status(200).json(error);
                    }
                    else {
                           
                           response.status(200).json(result);
                       }
    
                })
    
    }