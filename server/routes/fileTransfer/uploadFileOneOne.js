/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');
let bodyParser = require('body-parser');
let multer = require('multer');
var fs = require('fs');  
let variablefilename;


module.exports = (request,response)=>{
  let updateProfilePhotoResponse = {}
	try{

		let finalData
    const userId = request.params.fromID;
    
		let storage = multer.diskStorage({ //multers disk storage settings
  		destination: function (req, file, cb) {

     cb(null, './uploads/files');
    },
    filename: function (req, file, cb) {  
      
      let datetimestamp = Date.now();
      let filename = file.fieldname + '-'+ userId + '-'+ datetimestamp +'.' + file.originalname.split('.')[file.originalname.split('.').length -1];
      this.variablefilename=filename
      //cb(null, file.fieldname + '-'+ userId + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      
      cb(null, filename);
    }

  });

		let upload = multer({ //multer settings
      storage: storage,
      fileFilter : function(req, file, callback) { //file filter
      if (['png','jpg','mp3','mp4', 'pdf', 'txt'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
        return callback(new Error("wrong"));
      }

        callback(null, true);
      }
  }).single('file');


		upload(request,response,function(err){
      //console.log("inside upload")
    if(err)
      {
        response.json({error_code:1,err_desc:err, message: "Error encountered"});
      }
      //console.log(response.req.file.path)
     
    /*console.log(response.req.file.path)
    console.log(response.req.params.id)*/
    //console.log(response.req.params)
    let path = response.req.file.filename
    let mimeT = response.req.file.mimetype
    let data ={
              "fromUserId":response.req.params.fromID,
              "toUserId":response.req.params.toID,
              "timestamp":Date.now(),
              "file":{
                        "filePath":path,
                        "fileMIME":mimeT}
              }
    finalData = data
    

                  console.log("file stored General - FT",finalData)
                  updateProfilePhotoResponse.error = false;
                  updateProfilePhotoResponse.response = { "finalData":finalData};
                  updateProfilePhotoResponse.message = `File Uploaded to  Messages Collection`;
                  response.status(200).json(updateProfilePhotoResponse);
                
        


})  


}catch(error){
  updateProfilePhotoResponse.error = true;
                  updateProfilePhotoResponse.message = `Server error.`;
                  response.status(404).json(updateProfilePhotoResponse);
}
}



