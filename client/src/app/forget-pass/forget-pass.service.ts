/*Created By - Shefali Singh
Version - 1*/
//------------------------------Importing Modules-----------------------------------------------//
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MailotpService } from '../shared/mailotp.service';
import { Router } from '@angular/router';
import expressUrls from './../config/url';
//---------------------------------------------------------------------------------------------------
@Injectable()
export class ForgetPassService {
  //Initializing global variable

  constructor(private http:Http,private mailotp:MailotpService,private router:Router) { }
  result:any;
  values:any;
  //verifyEmail method//
  verifyEmail(info:any): Observable<any>{
    const url=expressUrls.forget;   //Initializing the Url 
    return (this.http)
    .get(url+info.email)    //Calling the http function
    .map((res:Response)=>   //Mapping the response
      res.json()
      );   
  }
  //verifyData method//
  verifyData(email:any){
    return  this.mailotp.sendMailOTP(email, "Email Verification","setpassword")
    //Calling method of MailotpService to send OTP
    ;
  }

}