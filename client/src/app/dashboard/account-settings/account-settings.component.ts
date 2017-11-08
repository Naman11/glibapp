import { Component, OnInit, ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountSettingsService} from './account-settings.service';
import  { GetInfoService} from '../../shared/get-info.service';
import { SocketService } from './../../socket.service';
import * as config from './config/multi_en_config.json';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers:[AccountSettingsService,GetInfoService]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private accSettings:AccountSettingsService, 
    private el: ElementRef, 
    private domSanitizer: DomSanitizer,
    private socketService : SocketService) { }
  userData:any={"status":"notDefined"}

  ngOnInit() {
  	this.accSettings.fetchUserInfo(localStorage.getItem('id')).subscribe((res)=>{
  		this.userData=res.result;
  	})
  }
  newPassword:string;
  oldPassword:string;
  confNewPassword:string;
  newContact:number;
  newStatus:string;
  public word= (<any>config).accountSettings;
  updatePassword(newPassword:any, oldPassword:any){
  	if(this.confNewPassword==this.newPassword){this.accSettings.updatePassword({"id":this.userData._id, "newPassword":newPassword,"oldPassword":oldPassword})
  	.subscribe((res)=>{
  		console.log(res)
  	})}
  }
  updateContact(contact:any){
    console.log(this.userData.contact)
  	this.accSettings.updateContact({"id":this.userData._id, "contact":this.userData.contact})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  updateStatus(){
  	console.log(status)
  	this.accSettings.updateStatus({"id":this.userData._id, "status":this.userData.status})
  	.subscribe((res)=>{
  		console.log(res)
      this.getUserData();
  	})
  }
  isOnline(toggleOnOff:any){
  	this.accSettings.isOnline({"id":this.userData._id})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  isOffline(toggleOnOff:any){
  	this.accSettings.isOffline({"id":this.userData._id})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  /*updateProfilePhoto(profilePicture:any){
  	this.accSettings.updateProfilePhoto({"email":this.userData.email})  //MULTER
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }*/

  //this will get the upload the selected file
  userUpload() {
    
      //locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
      //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;
      //create a new fromdata instance
      let formData = new FormData();
      //check if the filecount is greater than zero, to be sure a file was selected.
      if(fileCount > 0)
      {
        // a file was selected
        //append the key name 'file' with the first file in the element
        formData.append('file', inputEl.files.item(0));
        this.accSettings.updateProfilePhoto(formData, this.userData._id).subscribe((response) => {
          this.getUserData();

        });
        /*this.socketService.updateProfilePhoto(formData, this.userData._id).subscribe((response) => {

        });*/
      } 



    }


 profilePhoto : string;
 myReader:any;
   
   getUserData()
   {
     this.accSettings.fetchUserInfo(localStorage.getItem('id')).subscribe((res)=>{
      this.userData=res.result;
      console.log("this from update",this.userData.profilePhoto)
      this.accSettings.userProfile(res);
      
    })
   }


}
