/*Created By - Vismita Pavdighada
Version - 1*/
//------------------------------Importing Modules-----------------------------------------------//
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GetInfoService} from '../../shared/get-info.service';
import {DashboardService} from '../dashboard.service';
import { Router } from '@angular/router';
import expressUrls from './config/url';

//---------------------------------------------------------------------------------------------------
@Injectable()
export class AccountSettingsService {
  //Initializing global variable

  constructor(private http:Http,private router:Router,private fetchUsrInfo:GetInfoService,private dashboardService : DashboardService) { }
result:any;
values:any;
//verifyEmail method//

  fetchUserInfo(email:string){
    return this.fetchUsrInfo.fetchInfo(email)
   

  }
  updatePassword(object:any): Observable<any>{
       //Initializing the Url 
    return (this.http)
    .post(expressUrls.updatePassword,object)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
    res.json()
  );   
  }
  updateContact(object:any): Observable<any>{
    
    return (this.http)
    .post(expressUrls.updateContact,object)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
    res.json()
  );   
  }

  updateStatus(object:any): Observable<any>{
    
    return (this.http)
    .post(expressUrls.updateStatus,object)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
    res.json()
  );   
  }
  isOnline(object:any): Observable<any>{
    
    return (this.http)
    .post(expressUrls.isOnline,object)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
    res.json()
  );   
  }
  isOffline(object:any): Observable<any>{
    
    return (this.http)
    .post(expressUrls.isOffline,object)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
    res.json()
  );   
  }
  updateProfilePhoto(formData : FormData, email : any): Observable<any> {
    //console.log("this is my email", email);
      // this.dashboardService.photoEmitter.emit({formData:formData,email:email});
      return this.http.post(expressUrls.updateProfilePhoto+email, formData)
      /*.map( response =>
      response.json(),
      (error:any)=>{
      error.json();
      })*/;
      
    }
    userProfile(userData){
      this.dashboardService.photoEmitter.emit(userData);
    }
 

}