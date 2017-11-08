import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import expressUrls from './config/url';
import 'rxjs/add/operator/map';
@Injectable()
export class FileTransferGlobalService {
  constructor(private http: Http) { }



public sendFileGeneral(formData : FormData, id : any):Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	console.log(id,"sendFile")
	//const url="http://localhost:3333/";
	return this.http.post(expressUrls.uploadFileGeneral+id , formData).map((res:Response)=><any>res.json());
	/*return this.http
	.post(expressUrls.uploadFile,{"id":id})*/
	//.map((res:Response)=><any>res.json());
}

public sendFileOneOne(formData : FormData, fromId : any, toId : any):Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	console.log(fromId,"sendFile from ID")
	console.log(toId,"sendFile to ID")
	//const url="http://localhost:3333/";
	return this.http.post(expressUrls.uploadFileOneOne+fromId+"/"+toId , formData).map((res:Response)=><any>res.json());
	/*return this.http
	.post(expressUrls.uploadFile,{"id":id})*/
	//.map((res:Response)=><any>res.json());
}

}
