	/*========================Importing all the files we need==========================*/
	import { Injectable } from '@angular/core';
	import {Http,Response} from '@angular/http';
	import { GetInfoService} from '../../shared/get-info.service';
	import { Observable } from 'rxjs/Observable';
	import { FileTransferGlobalService} from '../../shared/file-transfer-global.service';
	@Injectable()
	export class ChatsService {

		constructor(private http:Http,private fetchUsrInfo:GetInfoService, private fTService:FileTransferGlobalService ) { }
		getProfilePhoto(id:string):Observable<any> {
			return this.fetchUsrInfo.fetchInfo(id)
			.map((res)=>{
				return res})
		}
		/*=======================================upload file=============================*/
		uploadFile(formData : FormData, fromId : any, toId : any): Observable<any> {
			return this.fTService.sendFileOneOne(formData,fromId, toId).map((res)=>{return res});
		}
	}
