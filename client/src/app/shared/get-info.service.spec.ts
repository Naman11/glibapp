import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { GetInfoService } from './get-info.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as config from './config/globalServices.test.config.json';
describe('GetInfoService', () => {
let de:  DebugElement;
let el:  HTMLElement;
let mockBackend:any;
let registerService:any;
let data:any;
let word= (<any>config).getInfoService;
beforeEach( async(() => {
TestBed.configureTestingModule({
 providers: [GetInfoService,
 MockBackend,
 BaseRequestOptions,
 {
   provide: Http,
   deps: [MockBackend, BaseRequestOptions],
   useFactory:
   (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
     return new Http(backend, defaultOptions);
   }
 }]
})
.compileComponents();
}));



it('should be created', inject([GetInfoService], (service: GetInfoService) => {
expect(service).toBeTruthy();
}));



it('user exists, fetches information', fakeAsync(() => {

const mockResponse = word.mockResponsePositive

let service: GetInfoService = getTestBed().get(GetInfoService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------


service.fetchInfo(word.id).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   expect(res).toBe(word.mockResponsePositive);
   tick();
   expect(res.error).toBe(false);
   
 });
}));

it('user doesnot, fetches information', fakeAsync(() => {

const mockResponse = word.mockResponseNegativeUNF

let service: GetInfoService = getTestBed().get(GetInfoService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------


service.fetchInfo(word.id).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   expect(res.message).toBe(word.mockResponseNegativeUNF.message);
   tick();
   expect(res.error).toBe(true);
   
 });
}));






});

