/*   * By : Shefali Singh
   
   */

//----------------------Importing Modules----------------------------------------//
import { Component, OnInit } from '@angular/core';
import { SetPasswordService } from './set-password.service';
import * as config from '../config/multi_en_config.json';
import { Router } from '@angular/router';
import { MailotpService} from '../shared/mailotp.service';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../User';

//---------------------------------------------------------------------------------//
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
  providers: [SetPasswordService]
})

//----------------------------Exporting class SetPasswordComponent------------------//
export class SetPasswordComponent implements OnInit {
  /*Initializing global variables*/
  info:any={};
  change:any;
  data:any;
  values:any={};
  otpvalues:any;
  user: User;
  value:any;
  public word= (<any>config).setPassword;
  constructor(private setPassword:SetPasswordService,
    private router:Router, private mailotp:MailotpService) { }

  //changePassword Method//
  changePassword(info:any){
    /*Initializing values into other variable*/
    this.values.email=this.otpvalues;
    this.values.password=this.info.password;
    this.setPassword.changePassword(this.values)    //calling function from Service
    .subscribe((res)=>{
      this.value=res;

      if(res.length!==0){    //Checking the response
        alert("Password updated. Please login");
        res}else{
          alert("Password not updated, Kindly update");
        }
        this.router.navigate(['/login']);
      });      // Subscribing the result
  }
//save method//
  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
  }
//getValues method
  getValues(){
    this.otpvalues=this.setPassword.getValues();
  }
  ngOnInit() {
    this.getValues()
    // initialize model here
    this.user = {
      Password: '',
      ConfirmPassword:''
    }
  }
}