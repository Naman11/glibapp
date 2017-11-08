 /*Created by: Shefali Singh*/
//---------------------------Importing Modules-----------------------------------------------------
import { Component } from '@angular/core';
import { ForgetPassService } from './forget-pass.service';
import { Router } from '@angular/router';
import * as config from '../config/multi_en_config.json';
import { Directive, forwardRef,Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
//----------------------------------------------------------------------------------------------------
@Component({
    selector: 'app-forget-pass',
    templateUrl: './forget-pass.component.html',
    styleUrls: ['./forget-pass.component.css'],
    providers: [ForgetPassService]      //Using ForgetPassService
})
export class ForgetPassComponent {
    //Initializing global varibales
    data:any={};
    verify:any;
    values:any={};
    otp:any;
    result:any;
    public word= (<any>config).forgetPass;
    constructor(private forgetUser:ForgetPassService,private router:Router) { }
    //verifyEmail method
    verifyEmail(email){
        
        this.forgetUser.verifyEmail(email)
        .subscribe((res)=>{
            this.values=res.result;
            if(this.values.email==undefined)      //Checking condition on response
            {
                this.result="Invalid Email"
                alert("Invalid Email!");
            }else{
                
                this.forgetUser.verifyData(this.values.email).subscribe((res)=>{
                    this.result=res;
                    this.router.navigateByUrl('/verify');
                });
            };
        });
    }
}