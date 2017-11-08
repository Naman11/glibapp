import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
 
import { ChatService } from './../chat.service';
import { HttpService } from './../http.service';
 
@Component({
  selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css'],
      providers : [ChatService,HttpService]
})
export class LoginComponent{
  
  private username = null;
      private email = null;
      private password = null;
 
      private isuserNameAvailable = false;
      private userTypingTimeout= 500;
      private typingTimer = null;
 
      constructor(
          private chatService : ChatService,
          private router :Router
      ){ }
 
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
 
      public login():void{
 
        if(this.username === '' || this.username === null) {
            alert(`Username can't be empty.`);
        }else if(this.password === '' || this.password === null ){
            alert(`Password can't be empty.`);
        }else{
            this.chatService.login({
                  'username' : this.username,
                  'password' : this.password,
            },(error , result)=>{
                if(error) {
                    alert(result);
                }else{
                    if(!result.error) {
                        // this.router.navigate(['/home/'+result.userId]);
                        localStorage.setItem("id",result.userId)
                        this.router.navigate(['/dashboard/']);

                    }else{
                        alert(`Invalid Credentials`);
                    }
                }
            });
        }
      }
 
    // public registerUser():void{
        
    //     if(this.username === '') {
    //         alert(`Username can't be empty.`);
    //     }else if(this.email === ''){
    //         alert(`Email can't be empty.`);
    //     }else if(this.password === ''){
    //         alert(`Password can't be empty.`);
    //     }else{
    //        this.chatService.registerUser({
    //             username : this.username,
    //             email : this.email,
    //             password : this.password
    //         },(error , result)=>{
    //             if(error) {
    //                 alert(result);
    //             }else{
    //                 if(!result.error) {
    //                     this.router.navigate(['/home/'+result.userId]);
    //                 }else{
    //                     alert(`Registration failure.`);
    //                 }
    //             }
    //         });
    //     }
    // }
 
}