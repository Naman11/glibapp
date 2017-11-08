import { Injectable,Output,EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DashboardService{
	@Output() photoEmitter = new EventEmitter<any>();

	updateProfile(data){}

}
