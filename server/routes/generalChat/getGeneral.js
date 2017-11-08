const helper = require('../../utils/helper');
module.exports= function (request, response) {

        helper.getfromGeneral(function(error,result){
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })
        }