import { Injectable } from '@angular/core';
 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { Observable } from 'rxjs/Rx';
 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class HttpService {
 
  	/* 
	* specifying Base URL.
	*/
   private BASE_URL = 'http://localhost:4000/';
   //private BASE_URL = 'http://192.168.252.186:4000/';
    /* 
	* Setting the Request headers.
	*/
    private headerOptions = new RequestOptions({
        headers : new Headers({ 'Content-Type' : 'application/json;charset=UTF-8' })
    });
 
  	constructor( private http:Http) { }
 
  	public userNameCheck(params){
  		return this.http.post(`${this.BASE_URL}usernameCheck`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  	}
 
	public login(params){
        return this.http.post(`${this.BASE_URL}login`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  	}
 
  	public registerUser(params){
  		return this.http.post(`${this.BASE_URL}registerUser`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  	}
 
    public userSessionCheck(params){
        return this.http.post(`${this.BASE_URL}userSessionCheck`,JSON.stringify(params),this.headerOptions)
            .map( (response:Response) => response.json())
            .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
    }
 
	public getMessages(params){
		return this.http.post(`${this.BASE_URL}getMessages`,JSON.stringify(params),this.headerOptions)
	    	.map( (response:Response) => response.json())
	      	.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}
  
  public scraping(data):Observable<any>{
  console.log("url is", data)
    const url='http://localhost:4000/unfurl';      //Setting the url
    //const url='http://192.168.252.186:4000/unfurl';
    return(this.http).post(url,{url : data},this.headerOptions)        //Calling the http request
    .map((response:Response)=>response.json());        //Mapping the response
  }
  public resetFlag(data):Observable<any>{
  console.log("url is", data)
    const url='http://localhost:4000/users';      //Setting the url
    //const url='http://192.168.252.186:4000/users';
    return(this.http).put(url, data)        //Calling the http request
    .map((response:Response)=>response.json());        //Mapping the response
  }

}