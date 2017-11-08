
import { Component, OnInit,ElementRef } from '@angular/core';
import { GeneralChatService } from '../../shared/general-chat.service';
import { ChatService } from './../../chat.service';
import { HttpService } from './../../http.service';
import {GeneralService}from './general.service';
import { ActivatedRoute ,Router } from '@angular/router';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers:[GeneralChatService,ChatService,HttpService,GeneralService]
})
export class GeneralComponent implements OnInit {

 allGeneralMessages:any=[];
 private username = null;
 private userId = null; 
 socketmessage:any;
 socketcode: any;
 message: string;
 messages: string[] = [];
 user:any;
 userfinal:any;
 serveruser:any;
 chatroom:string;
 currentUser:string;
 Java:any="java";
 C:any="C";
 Python:any="Python";
 Javascript:any="Javascript";
 language:string;
 data:any={};
 dbmessage:any={};
 c:any="c";
 url:any;
 scrapingData:any={};
 sendData:any={};
 codeId:any;
 fileData:any;
 socketfile:any;
  downloadCodeTesting:any;
 saveMessageTesting:any;
 retreiveMsgDataComponent:any=[];
 sendCodeDataComponent:any;

 constructor(private generalChatService: GeneralChatService,private generalService:GeneralService,
   private chatService : ChatService,
   private route :ActivatedRoute,
   private router :Router,
   private el: ElementRef)   
 {


   this.generalChatService.getMessageObservable.subscribe((message)=>{
     //console.log("Message is here", message);
     this.socketmessage=message; 
     this.allGeneralMessages.push(this.socketmessage);
     //console.log("mes",this.allGeneralMessages);
   })

   this.generalChatService.getCodeObservable.subscribe((code)=>{
     //console.log("code is here", code);
     var codemodified={
      "username":code.username,
       "code":{
      "codeId":code.codeId, 
       "code":code.code,
       "language":code.language,
       "title":code.title
        }

     }
     //console.log("modified code object",codemodified);
     this.socketcode=codemodified; 

//console.log("this is socket code to be pushed",this.socketcode);

     this.allGeneralMessages.push(this.socketcode);

  //   console.log("message code",this.allGeneralMessages);
//console.log("mes",this.allGeneralMessages);

   })

   this.generalChatService.getFileObservable.subscribe((file)=>{
     var fileModified=file
     this.socketfile=fileModified; 
     this.allGeneralMessages.push(this.socketfile);
   })
   
 }



//Call back sequence for upload file

 sendFileData(callbackfile=()=>{
//-------------------------- saving the file to db start-------------------------------------------------------------//
  console.log("inside function userUpload")
  let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
  //get the total amount of files attached to the file input.
  let fileCount: number = inputEl.files.length;
  
  let fileType = inputEl.files[0].type
  //create a new fromdata instance
  let formData = new FormData();
  //check if the filecount is greater than zero, to be sure a file was selected.
  if(fileCount > 0)
  {
    // a file was selected
    //append the key name 'file' with the first file in the element
    formData.append('file', inputEl.files.item(0));
    this.generalService.uploadFile(formData, this.username).subscribe((response) => {
      console.log(response)
      this.fileData  = {


      "_id" : response.response.finalData._id,
  "username" : response.response.finalData.username,
  "timestamp" : response.response.finalData.timestamp,
  "file" : response.response.finalData.file
    }
    console.log("file Data Vismiiiiiiiii", this.fileData )
      this.callbackFileData();



    });
  } 

})

 {
callbackfile();
// callbackCode2();
  
 }
callbackFileData=()=>{

//----------------------------------saving ang getting data from socket start----------------------------------------//

 this.generalChatService.sendFile(this.fileData);

//---------------------------------saving and getting data from the socket end--------------------------------------//

 }



player: any;
   savePlayer (player) {
   this.player = player;
 
   }
  
downloadCode(codeId)
{
  console.log(" In download code allGeneralMessages", this.allGeneralMessages)
  console.log("This is download code component ts ");
  this.codeId=codeId;
  this.generalService.getCodeDatasById(this.codeId)
  .subscribe((code:any)=>{
    console.log("inside subscribe2", code[0].code.code);
    let imageBlob = new Blob([code[0].code.code],{ type : 'text/plain' })
      let filename = code[0].code.title+'.txt';
      this.downloadCodeTesting=code;
       FileSaver.saveAs(imageBlob, filename);
  })
}

//---------------------------------------------- callback in messages start--------------------------------------------//

 sendMessage(callback=()=>{

      if(this.message!='')

      {

        this.dbmessage.message=this.message;

  //      console.log(this.dbmessage, 'check dbmessage');

        this.message='';

      }

      if(this.dbmessage.message.includes('https://youtu.be/')==true){

    //    console.log(2, 'inside youtube');

        this.dbmessage.id=this.dbmessage.message.substr(17);

        this.messages.push(this.dbmessage);

        this.message = null;

      //  console.log(3, 'youtube data', this.dbmessage);

        this.generalService.saveMessage(this.username,this.dbmessage)

        .subscribe((current: string) => {

          this.socketSave();
          this.dbmessage={};
          this.saveMessageTesting=current;


        });

      }else if(this.dbmessage.message.includes('https:')==true || this.dbmessage.message.includes('http:')==true){

        //console.log(4, 'inside url');

this.saveMessageTesting=null;

        this.url=this.dbmessage.message.substring(this.dbmessage.message.indexOf('http'));

        this.chatService.scraping(this.url, ( error , response)=>{

          //console.log('at response', 5, response);

          if(!response.error) {

            this.scrapingData=response;

            this.dbmessage.title=this.scrapingData.other.title;

            this.dbmessage.description=this.scrapingData.other.description;

            if(this.scrapingData.ogp==undefined){

              this.generalService.saveMessage(this.username,this.dbmessage)

              .subscribe((current: string) => {

                this.socketSave();

                this.dbmessage={};
          this.saveMessageTesting=current;

              });

            }else{

              if(this.scrapingData.ogp.ogImage[0].url==undefined){

                this.dbmessage.image=this.scrapingData.twitter.twitterImage[0].url;

              }else{

                this.dbmessage.image=this.scrapingData.ogp.ogImage[0].url;

              }

            //  console.log(6, 'last url', this.dbmessage);

              this.generalService.saveMessage(this.username,this.dbmessage)

              .subscribe((current: string) => {

                this.socketSave();

                this.dbmessage={};
//          this.saveMessageTesting=current;

              });              }

            }

          })

      }else{

        this.generalService.saveMessage(this.username,this.dbmessage)

    .subscribe((current: string) => {

this.socketSave();
          this.saveMessageTesting=current;


    });

    

      }



 })

 {


callback();
// callback2();


 }

 socketSave=()=>{

let data={

  "username":this.username,
  "message":this.dbmessage,
  // "time":moment().format('hh:mm:ss a')
}

//------------------------------------------------------sends and gets the message to the socket.io start-------------//

  // let currentTime = moment().format('hh:mm:ss a');
   this.generalChatService.sendMessage(data);
   console.log(data, 'data in socketSave');

   this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
        // this.allGeneralMessages.push(this.socketmessage);
      }
    //console.log("component",current);
    this.currentUser=current;
    });


//---------------------------------------------sends and gets the message to the socket.io end----------------------//


 //---------------------------------------------- callback in messages end --------------------------------------------//

 }





 
// get room name from dropdown and the service
room(room):any{
 this.chatroom=room;
 //console.log(this.chatroom);
 this.generalChatService.chatRoom();
 this.generalChatService.getChatRoom();
}

 sendUserName(){
   //console.log(this.username);
   this.generalChatService.sendUser(this.username);
   this.userfinal=this.username;
   // this.user='';
 }

 disconnectUser(){
   this.generalChatService.disconnectUsers();
 }


//getting all the general channel saved messages from the db
retreive(){

this.generalService.retrieveMessage().subscribe((generalmessage) => {

//console.log("received general messages",generalmessage);

let  aa=generalmessage.map((i)=>{
//i.message.id=null;
 // console.log(i.message.message);

  if(i.message==undefined){


this.getCodeData();
              
    
  }else{
          if(i.message.message.includes('https://youtu.be/')==true){

                i.message.id=i.message.message.substr(17);

                console.log(i, 'check id');

              }else{

                i.message.id=null;

              }
            }
//i.message.id=null;
              return i;            

          });

//console.log(generalmessage, 'check output');

this.allGeneralMessages=generalmessage;
this.retreiveMsgDataComponent=generalmessage;

//console.log(this.allGeneralMessages);
    // this.currentUser=current;
    });
}

//get the language from dropdown in html
languageSelect(lang){

this.data.language=lang;
this.data.username=this.username;
//console.log("Language is = ",this.data.language);
//console.log("This is language select",this.data.username);
}

//-------------------------------------------- callback for code start----------------------------------------------------//

 sendCodeData(callbackcode=()=>{
//-------------------------- saving the data to db start-------------------------------------------------------------//
  console.log("***************** In component");
   let id = Math.floor((Math.random() * 100000000) + 1);
   this.data.codeId=id;
   console.log("This is auto generated id  in sequential manner in send Code", id);

   this.generalService.saveCode(this.data)
   .subscribe((code: string) => {
     this.callbackCodeData();
     this.sendCodeDataComponent=code;

    //   console.log("@@@@@@@@@@@save code callback1",code);
     });

//    console.log("This is after serveice call through compoentr*****************");

       this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
        // this.allGeneralMessages.push(this.socketmessage);
      }
  //  console.log("component",current);
    this.currentUser=current;
    });

//-----------------------saving data to db end-----------------------------------------------------------------------//
 })

 {
callbackcode();
// callbackCode2();
  
 }
callbackCodeData=()=>{

//----------------------------------saving ang getting data from socket start----------------------------------------//

 this.generalChatService.sendCode(this.data);
  this.generalChatService.getCode()
      .subscribe((code: string) => {
        this.getCodeData();
    //   console.log("@@@@@@@@@@@ socket code component callback2",code);



     });

//---------------------------------saving and getting data from the socket end--------------------------------------//


 }


//----------------------------------------- callback for code data end -----------------------------------------------//

//get the code from html and send it using socket io
// codeData(data){
//   this.generalChatService.sendCode(data);
//   this.generalChatService.getCode()
//       .subscribe((code: string) => {
//        console.log("@@@@@@@@@@@",code);
//      });
//       this.saveCodeData(data);
// }

// saveCodeData(data){
//   console.log("savecoddat",data);
//   this.generalService.saveCode(data)
//    .subscribe((code: string) => {
//        console.log("@@@@@@@@@@@save code",code);
//      });
// }

getCodeData(){
   this.generalService.getCodeDatas()
      .subscribe((code: string) => {
      // console.log("getting code from mongo",code);
     });
}

 ngOnInit() {

this.retreive();

// this.getCurrentUser()
  
 // this.userId = this.route.snapshot.params['userid'];
 this.userId=localStorage.getItem('id');
  if(this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    }else{

      /*
      * function to check if user is logged in or not starts
      */  
      this.chatService.userSessionCheck(this.userId,( error, response )=>{
          if(error) {
            this.router.navigate(['/']); /* Home page redirection */
          }else{
            
            this.username = response.username;
        //    console.log("##############",this.username);
            this.sendUserName();
          }
        }
        )}

// getting message through sockrt io
   this.generalChatService
     .getMessages()
     .subscribe((message: string) => {
       if(message){
         // this.retreive();
       }
       
       // let currentTime = moment().format('hh:mm:ss a');
       // let messageWithTimestamp = `${currentTime}: ${message}`;
       // this.messages.push(messageWithTimestamp);


     });

     this.generalChatService.getUserName()
      .subscribe((message: string) => {
       let currentTime = moment().format('hh:mm:ss a');
       let messageWithTimestamp =  `${currentTime}: ${message}`;
       this.serveruser=message;
       //console.log("@@@@@@@@@@@@",this.serveruser);
     });

   

 }


}
