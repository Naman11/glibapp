/*importing the dependency*/
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../shared/register.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { MailotpService} from '../shared/mailotp.service';
import { User } from '../User';
import { ChatService } from './../chat.service';
import { HttpService } from './../http.service';
import * as config from './config/multi_en_config.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [ChatService,HttpService]

})
//Exporting RegisterComponent class//
export class RegisterComponent{

  public data:any;
  /*declaration of variable*/
  public word = (<any>config).register;
  //public now = moment().format('YYYY-MM-DD')
  errorMsg:string;
  public username = null;
  public email = null;
  public password = null;
  result:any;
  private isuserNameAvailable = false;
  private userTypingTimeout= 500;
  private typingTimer = null;
  constructor(
    private mailotp:MailotpService,private chatService : ChatService,
    private router :Router,private registerService :RegisterService
    ) { }
  public onkeyup(event){
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout( ()=>{
      this.chatService.checkUserNameCheck({
        'username' : this.username
      }, (response)=>{
        if(response.error) {
          this.isuserNameAvailable = true;
        }else{
          this.isuserNameAvailable = false;
        }
      });
    }, this.userTypingTimeout);
  }
  public onkeydown(event){
    clearTimeout(this.typingTimer);
  }
  //register method//
  public registerUser():void{
    if(this.username === '') {       
      alert(`Username can't be empty.`);  /* alert for username can't be empty*/
    }else if(this.email === ''){
      alert(`Email can't be empty.`);  /* alert for email can't be empty*/
    }else if(this.password === ''){
      alert(`Password can't be empty.`);  /* alert for password can't be empty*/
    }else{

      this.registerService.tempUser({"email":this.email, "username":this.username, "password":this.password})

      this.mailotp.sendMailOTP(this.email, "Registeration Verification", "login").subscribe((res)=>{       /* sending email*/
        this.result=res.message;
          if(res.message = "OTP Sent"){                   /*otp sent*/
          this.router.navigateByUrl('/verify')
        }else{
          alert(`Invalid Email.`) /*if the otp didn't matches show invalid email */
        }
      })
    }
  }
  ngOnInit() {
    // initialize model here
  }
}


