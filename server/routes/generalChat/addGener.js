const helper = require('../../utils/helper');
module.exports= function (request, response) {

        //console.log("This is addgeneralchat serverside",request.body);
        var data={
            "username":request.body.username,
            "timestamp":Date.now()
             
            

        };
        if(request.body.message!==undefined)
        {
         data.message= request.body.message;
        }

        if(request.body.code!==undefined){

             data.code={
               "codeId": request.body.codeId,
                "title":request.body.title,
                "code":request.body.code,
                "comment":request.body.comment,
                "language":request.body.language,
                "username":request.body.username
            };
        }
        if(request.body.url!==undefined)
        {
            data.url=request.body.url;
        }

        if(request.body.filepath!==undefined)
        {
            data.filepath=request.body.filepath;
        }
            // "username":request.body.username,
            // "timestamp":Date.now(),
            // "message": request.body.message,
            // "code":{
            //     "title":request.body.title,
            //     "code":request.body.code,
            //     "comment":request.body.comment,
            //     "language":request.body.language
            // },
           
             
        helper.insertToGeneral(data,function(error,result){
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })
        }