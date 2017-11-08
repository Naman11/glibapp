//-----------------------Importing Modules-----------------------------------------//
import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { FileTransferGlobalService} from '../../shared/file-transfer-global.service';

@Injectable()
export class GeneralService {

  constructor(private http:Http,private fTService:FileTransferGlobalService) { }


    uploadFile(formData : FormData, id : any): Observable<any> {
    
      return this.fTService.sendFileGeneral(formData,id).map((res)=>{console.log(res);return res});
      
    }
   

  saveMessage(username,message): Observable<any>{
  let obj:any={};
  obj={
  	"username":username,
  	"message":message
  }
  console.log("This is service method general.service OBJ->>",obj);
	//const url="http://localhost:4000/generalChats";
  const url="http://192.168.252.186:4000/generalChats";
    return this.http
    .post(url,obj) //calling the http function
    .map((res)=>res.json());
  	
   }

saveCode(data){
//const url="http://localhost:4000/generalChats";
const url="http://192.168.252.186:4000/generalChats";
    return this.http
    .post(url,data) //calling the http function
    .map((res)=>res.json());
}


getCodeDatas():Observable<any>{
     //const url="http://localhost:4000/generalChats";
     const url="http://192.168.252.186:4000/generalChats";
    return this.http
    .get(url) //calling the http function
    .map((res)=>{
console.log("this is general response",res)
      return res.json()});
   }

getCodeDatasById(codeId){
       // let codeId=33164587;
      const url="http://localhost:4000/generalChats/Id/"+codeId;
      //const url="http://192.168.252.186:4000/generalChats/Id/"+codeId;
      return this.http
      .get(url) //calling the http function
      .map((res)=>{
      console.log("this is general response",res)
      return res.json()});
    
    }

   retrieveMessage():Observable<any>{
   	const url="http://localhost:4000/generalChats";
    //const url="http://192.168.252.186:4000/generalChats";
    return this.http
    .get(url) //calling the http function
    .map((res)=>{
console.log("this is general response",res)
    	return res.json()});
   }
	}
