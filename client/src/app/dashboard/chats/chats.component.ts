   /*=================   Importing modules =========================================*/
   import { Component, OnInit , OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
   import { ActivatedRoute ,Router } from '@angular/router';
   import {ChatsService} from './chats.service';
   import { SocketService } from './../../socket.service';
   import { HttpService } from './../../http.service';
   import { ChatService } from './../../chat.service';
   @Component({
   	selector: 'app-chats',
   	templateUrl: './chats.component.html',
   	styleUrls: ['./chats.component.css'],
   	providers:[ChatsService]

   })
   export class ChatsComponent implements OnInit, AfterViewInit{

   	/*============Chat and message related variables starts=========================*/
   	private userData:any;
   	private userName:any;
   	private userId:any;
   	private socketId:any;
   	private selectedSocketId:any;
   	private status:any='online';
   	private selectedUserId: any
   	private chatListUsers:any =[];
   	private message:any;
   	private messages:any = [];
      userInformation:any;
   	fileData:any
   	userProfilePic:any;
   	selectedUserProfilePic:any;
   	url:any;
   	scrapingData:any={};
   	sendData:any={};
   	flag=true;
      videoFlag:boolean;
      loginuser:any;
   	/*=================Chat and message related variables ends=====================*/

   	constructor(private route: ActivatedRoute,
   		private chatService : ChatService,
   		private socketService : SocketService,
   		private router :Router,
   		private picService:ChatsService,
   		private el: ElementRef) { }

   	player: any;
   	savePlayer (player) {
   		this.player = player;

   	}
   	ngOnInit() {
   		setTimeout(()=>{
   			document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
   		},100);

   		this.route.queryParams.subscribe(params => {
   			this.selectedUserId=params["selectedUserId"];
   			this.userName=params["selectedUserName"];
            this.loginuser=params["username"];
   			this.userId=params["userId"];
   			this.selectedSocketId=params["selectedSocketId"];
   			localStorage.setItem("sid",this.selectedUserId);
   			this.userInformation={
            userId:this.userId,
            anotherId:this.selectedUserId
            };
            if(params["type"]!=undefined)
            {
               this.videoFlag=true;
               this.videoConnectPeer();
            }
   			if(params["status"]!=undefined){
   				console.log("inside stauts params")
   				this.status=params["status"];
   			}
   			this.chatService.getMessages({ userId : this.userId,toUserId :this.selectedUserId} , ( error , response)=>{
   				if(!response.error) {
   					let  aa=response.messages.map((i)=>{
   						i.timestamp=new Date(i.timestamp*1000).toLocaleString();
   						if(i.message!=undefined){
   							if(i.message.includes('https://youtu.be/')==true){
   								i.id=i.message.substr(17);
   							}else{
   								i.id=null;
   							}}
   							else if(i.file!=undefined){
   							}
   							return i;    				
   						});
   					this.messages = response.messages;   
   				}			
   			});
   		});

   		this.getUserProfilePic(this.userId);
   	}
   	ngAfterViewInit()
   	{
   		this.socketService.receiveMessages().subscribe(response => {
   			var date = new Date((response.timestamp*1000));
   			var newDate=date.toLocaleString();
   			response.timestamp=newDate;

   			if(this.selectedUserId && this.selectedUserId == response.fromUserId) {
   				this.sendData=response;
   				if(this.sendData.message!= undefined){
   					if(this.sendData.message.includes('https://youtu.be/')==true){
   						this.sendData.id=this.sendData.message.substr(17);
   					}else{
   						this.sendData.id=null;
   					}}
   					else if(this.sendData.file!= undefined){
   					}
   					this.messages.push(this.sendData);
   					setTimeout( () =>{
   						document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
   					},100);				
   				}
   			});
   	}
   	/*=================method for send message button==================================*/
   	sendMessageButton(){
   		let data:any={};
   		data = {
   			fromUserId : this.userId,
   			message : (this.message).trim(),
   			toUserId : this.selectedUserId,
   			toSocketId : this.selectedSocketId,
   			fromSocketId : this.socketId,
   			msg_status:this.status
   		}
   		if(data.message.includes('https://youtu.be/')==true){
   			data.id=data.message.substr(17);
   			this.messages.push(data);
   			this.message = null;

   			this.socketService.sendMessage(data);
   		}else if(data.message.includes('https:')==true || data.message.includes('http:')==true){
   			this.url=data.message.substring(data.message.indexOf('http'));
   			this.chatService.scraping(this.url, ( error , response)=>{
   				if(!response.error) {
   					this.scrapingData=response;
   					data.title=this.scrapingData.other.title;
   					data.description=this.scrapingData.other.description;
   					if(this.scrapingData.ogp==undefined){
   						this.messages.push(data);
   						this.message = null;
   						this.socketService.sendMessage(data);
   					}else{
   						if(this.scrapingData.ogp.ogImage[0].url==undefined){
   							data.image=this.scrapingData.twitter.twitterImage[0].url;
   						}else{
   							data.image=this.scrapingData.ogp.ogImage[0].url;
   						}
   						this.messages.push(data);
   						this.message = null;
   						this.socketService.sendMessage(data);
   					}
   				}
   			})
   		}else{
   			this.messages.push(data);
   			setTimeout( () =>{
   				document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
   			},100);
   			this.message = null;
   			this.socketService.sendMessage(data);
   		}
   	}

   	sendMessage(event){
   		if(event.keyCode === 13) {
   			if(this.message === '' || this.message === null) {
   				alert(`Message can't be empty.`);
   			}else{

   				if (this.message === '') {
   					alert(`Message can't be empty.`);
   				}else if(this.userId === ''){
   					this.router.navigate(['/']);					
   				}else if(this.selectedUserId === ''){
   					alert(`Select a user to chat.`);
   				}else{

   					let data:any = {
   						fromUserId : this.userId,
   						message : (this.message).trim(),
   						toUserId : this.selectedUserId,
   						toSocketId : this.selectedSocketId,
   						fromSocketId : this.socketId,
   						msg_status:this.status
   					}
   					if(data.message.includes('https://youtu.be/')==true){
   						this.messages.push(data);
   						this.message = null;

   						this.socketService.sendMessage(data);
   					}else if(data.message.includes('https:')==true || data.message.includes('http:')==true){
   						this.url=data.message.substring(data.message.indexOf('http'));
   						this.chatService.scraping(this.url, ( error , response)=>{
   							if(!response.error) {
   								this.scrapingData=response;
   								data.title=this.scrapingData.other.title;
   								data.description=this.scrapingData.other.description;
   								if(this.scrapingData.ogp==undefined){
   									this.messages.push(data);
   									this.message = null;
   									this.socketService.sendMessage(data);
   								}else{
   									if(this.scrapingData.ogp.ogImage[0].url==undefined){
   										data.image=this.scrapingData.twitter.twitterImage[0].url;
   									}else{
   										data.image=this.scrapingData.ogp.ogImage[0].url;
   									}
   									this.messages.push(data);
   									this.message = null;
   									this.socketService.sendMessage(data);
   								}
   							}
   						})
   					}else{
   						this.messages.push(data);
   						setTimeout( () =>{
   							document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
   						},100);
   						this.message = null;
   						this.socketService.sendMessage(data);
   					}
   				}
   			}
   		}
   	}
   	alignMessage(userId){
   		return this.userId ===  userId ? false : true;
   	}


/*=======================Call back sequence for upload file=============================
*/sendFileData(callbackfile=()=>{
	//=================== saving the file to db start===================================//
	console.log("inside function userUpload")
	let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
	//========get the total amount of files attached to the file input.=================
	let fileCount: number = inputEl.files.length;

	let fileType = inputEl.files[0].type
	//=======================create a new fromdata instance========================
	let formData = new FormData();
	//===check if the filecount is greater than zero, to be sure a file was selected.===
	if(fileCount > 0)
	{
		//========================= a file was selected =================================
		//======append the key name 'file' with the first file in the element============
		formData.append('file', inputEl.files.item(0));
		this.picService.uploadFile(formData, this.userId, this.selectedUserId).subscribe((response) => {
console.log("inside updload file response",response.response);
			this.fileData  = {


				"fromUserId" : response.response.finalData.fromUserId,
				"toUserId":response.response.finalData.toUserId,
				"file" : response.response.finalData.file,
				"toSocketId":this.selectedSocketId

			}
			this.messages.push(this.fileData);
			setTimeout( () =>{
				document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
			},100);
			this.callbackFileData();
		});
	} 
})
{
	callbackfile();
	// =========================================callbackCode2();======================

}
callbackFileData=()=>{

	//==============saving ang getting data from socket start=========================//

	this.socketService.sendMessage(this.fileData);

	//===================saving and getting data from the socket end===================//

}

getUserProfilePic(id){
	this.picService.getProfilePhoto(id).subscribe((response)=>{
		this.userProfilePic=response.result.profilePhoto;
		this.getSelectedUserProfilePic(this.selectedUserId);
	})

}
getSelectedUserProfilePic(id){
	this.picService.getProfilePhoto(id).subscribe((response)=>{
		this.selectedUserProfilePic=response.result.profilePhoto
	})
}

/*=================== Set the width of the side navigation to 250px================= */
openNav() {
	
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginRight = "250px";
}

minNav() {
	this.flag=!this.flag;
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginRight = "250px";
}
maxNav(){
	this.flag=!this.flag;
	document.getElementById("mySidenav").style.width = "500px";
	document.getElementById("main").style.marginRight = "500px";
}
/*=========================== Set the width of the side navigation to 0============= */
closeNav() {

	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginRight = "0";
} 
videoConnect()
{
	this.socketService.getVideo(this.userId,this.selectedUserId,this.selectedSocketId,this.loginuser);
	this.openNav();
}

videoConnectPeer(){
   this.openNav();
   }
}