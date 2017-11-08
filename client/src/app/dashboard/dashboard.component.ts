import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
/* Importing services starts*/
import { SocketService } from './../socket.service';
import { HttpService } from './../http.service';
import { ChatService } from './../chat.service';
import {GetInfoService} from './../shared/get-info.service';
import {DashboardService} from './dashboard.service';
import swal from 'sweetalert2';

/* Importing services ends*/
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers:[DashboardService]
})
export class DashboardComponent implements OnInit {

/*
* UI related variables starts
*/

private editflag=false;
private overlayDisplay = false;
private selectedUserId = null;
private selectedSocketId = null;
private selectedUserName = null;
private offlineUsers:any=[];	
flagResponse:any=[];
videoUser:any;
/* 
* UI related variables ends
*/

/*
* Chat and message related variables starts
*/
private username = null;
private userId = null;
private socketId = null;
private currentRoute=null;
private chatListUsers = [];
private profilePhoto:any;

userInfo:any;
flagArray:any=[];
reciever:any=[];
isSocketConnected:boolean = false;
userData:any;
flag:any;
/*
* Chat and message related variables ends
*/
constructor(private chatService : ChatService,
	private socketService : SocketService,
	private route :ActivatedRoute,

	private router :Router,
	private httpService:HttpService,
	private genService:GetInfoService,
	private dashboardService : DashboardService) { }

	
ngOnInit() {




//this.flag=this.genService.getFlag();
//console.log("URL",this.router.url);
/*
* getting userID from URL using 'route.snapshot'
*/		
//this.currentRoute=this.router.url;
//console.log("#########",this.currentRoute);
//this.userId = this.route.snapshot.params['userid'];
//console.log("snapshot of id",this.userId);
this.userId=localStorage.getItem('id');
if(this.userId === '' || typeof this.userId == 'undefined') {
	this.router.navigate(['/']);
}else{






/*
* function to check if user is logged in or not starts
*/	

this.chatService.userSessionCheck(this.userId,( error, response )=>{
	//console.log("this is user data",response.profilePhoto);
	if(error) {
		this.router.navigate(['/']); /* Home page redirection */
	}else{
		if(response.reciever){
		this.reciever=response.reciever.map(i=>i.fromId);
		this.flagArray=response.reciever.map(i=>i.flag);
		}
		console.log("User session check -----------------",response);
		if(response.profilePhoto){this.profilePhoto= response.profilePhoto;}
		this.username = response.username;
		this.overlayDisplay = true;

/*
* making socket connection by passing UserId.
*/	
 this.isSocketConnected = this.socketService.connectSocket(this.userId);


/*
* calling method of service to get the chat list.
*/	
this.socketService.getChatList(this.userId).subscribe(response => {
	console.log("online users list",response);

	if(!response.error) {

		if(response.singleUser) 
		{

			if(this.router.url.includes('?'))
			{
				console.log("inside url if block");
				this.route.queryParams.subscribe(params => {
					let selectedUserId = params["selectedUserId"];
					let selectedUserName = params["selectedUserName"];
					console.log("selectedUserId**********",selectedUserId);
					console.log("response.chatList._id@@@@@@@@@@@@@@@@@@@@@",response.chatList._id);
					if(selectedUserId === response.chatList._id)
					{
						console.log("inside if ^^^^^^^^^^^^^^^^",response.chatList.socketId);
						this.userData = {
						_id: selectedUserId,
						socketId: response.chatList.socketId,
						username: selectedUserName
						}
						this.selectedUser(this.userData);
					}

				})
				
				
			}

			

			

/* 
* Removing duplicate user from chat list array.
*/
if(this.chatListUsers.length > 0) {
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj._id !== response.chatList._id;
	});
}

/* 
* Adding new online user into chat list array
*/


this.chatListUsers.push(response.chatList);
console.log("users online{{{{{}}}}}}}}",this.chatListUsers);

}else if(response.userDisconnected){
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj.socketId !== response.socketId;
	});
}else{
/* 
* Updating entire chatlist if user logs in.
*/
this.chatListUsers = response.chatList;
}
}else{
	alert(`Chat list failure.`);
}
this.getAllUsers();

});

}
this.socketService.getFlagToDashBoard().subscribe(resp=>{
	//console.log("here is the res########@@@!!!!s",resp.);
	this.flagResponse=resp;
	
//console.log("11211212121212121212121212121212121212");
	this.reciever=this.flagResponse.reciever.map((i)=>i.fromId);
	this.flagArray=this.flagResponse.reciever.map(i=>i.flag);
	console.log("22222222222222222222222222222222id",this.reciever);
	console.log("66666666666666666666666666666666,flag",this.flagArray);
});

this.socketService.getVideoResponse().subscribe((response)=>{
	console.log("############################################",response);
	this.videoUser=response;
	swal({
			title:'Incoming Call ',
			text:'Call is Comming',
			type:'info',
			showCancelButton:true,
			confirmButtonColor:'#283e4a',
			cancelButtonColor:'#f16363',
			padding:10,
			confirmButtonClass:null,
			width:'390px',
			confirmButtonText:'Accept'
		}).then(()=>{
			console.log("inside swal");
			let userData={
				userId: this.videoUser.toId,
		selectedUserId :this.videoUser.userId,
		selectedSocketId :this.videoUser.toSocketId_1,
		selectedUserName :this.videoUser.username,
		type:"v"
			}
console.log("navigating !!!!!!!!!!!!!!!!!!!!!!",userData);
		
	this.router.navigate(['chats'],{relativeTo: this.route, queryParams: userData});
		
		});
})

});
}



///////////////////PROFILE PHOTO


this.dashboardService.photoEmitter.subscribe((data)=>{
	console.log("photo data $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",data);
	this.profilePhoto=data.result.profilePhoto;
})





}
isUserSelected(userId:string):boolean{
		if(!this.selectedUserId) {
			return false;
		}
		return this.selectedUserId ===  userId ? true : false;
	}
	selectedUser(user):void{
		console.log("$$$$$$$$$$$$$",user);
		this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username,
		username:this.username
	};
	console.log("sockets are$$$$$$$$$$$$$$$$$$$",this.userData);
		this.httpService.resetFlag({"toId":this.userData.userId,"fromId":this.userData.selectedUserId}).subscribe((response)=>{
			console.log("response88888888888888888888888888888",response)
			console.log("*********************************",this.reciever.indexOf(user._id));
			this.flagArray[this.reciever.indexOf(user._id)]=0;
		// console.log("66666666666666666666666666666666666666",this.flagArray);
		// this.flag.splice(this.reciever.indexOf(this.userData.userId),1);
		// this.reciever.splice(this.reciever.indexOf(this.userData.userId),1);
		console.log("666666666666after",this.flagArray);
		console.log("8080808080808080808080after",this.flagArray);
	this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

		})
	//this.router.navigate([this.currentRoute+'/chats'],{ queryParams: user, skipLocationChange: true});


	}
	getAllUsers(){
		console.log("inside getallusers");
		this.socketService.getUserList(this.userId).subscribe((result)=>{
			console.log("all users",result);
			this.offlineUsers = result.filter(function(user){
  		return user.online=='N';
  	});
			console.log("Offline users are",this.offlineUsers);

		});
	}
	logout(){
		console.log("logout method");
		this.socketService.logout({userId : this.userId}).subscribe(response => {
			this.router.navigate(['/login']); /* Home page redirection */
		});
	}
	selectOfflineUsers(user):void{
		console.log("$$$$$$$$$$$$$",user);
		this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username,
		username:this.username,
		status:'offline'
	};
	this.httpService.resetFlag({"toId":this.userData.userId,"fromId":this.userData.selectedUserId}).subscribe((response)=>{
		console.log("resetFlag!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",response);
		//this.flagArray[this.reciever.indexOf(this.userData.userId)]=0;
		this.flagArray[this.reciever.indexOf(user._id)]=0;
		console.log("66666666666666666666666666666666666666",this.flagArray);
	this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

	})

	}

		//this.router.navigate([this.currentRoute+'/chats'],{ queryParams: user, skipLocationChange: true});

	}