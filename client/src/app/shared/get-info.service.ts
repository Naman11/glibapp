import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import expressUrls from './config/url';
import 'rxjs/add/operator/map';
@Injectable()
export class GetInfoService {
  constructor(private http: Http) { }
public fetchInfo(email:string): Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	console.log(email,"fetchInfo@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
	//const url="http://localhost:3000/getUserInfo/"+email;
	return this.http
	.post(expressUrls.getUserInfo,{"id":email})
	.map((res:Response)=><any>res.json());
}

public fetchProfilePicture(email):Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	console.log(email,"fetchPicture")
	//const url="http://localhost:3333/";
	return this.http
	.post(expressUrls.getUserInfoPhoto,{"id":email})
	//.map((res:Response)=><any>res.json());
}

}
