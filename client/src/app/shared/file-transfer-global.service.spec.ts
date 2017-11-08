import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { FileTransferGlobalService } from './file-transfer-global.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as config from './config/globalServices.test.config.json';
describe('FileTransferGlobalService', () => {
let de:  DebugElement;
let el:  HTMLElement;
let mockBackend:any;
let registerService:any;
let data:any;
let word= (<any>config).fileTransferGlobalService;
beforeEach( async(() => {
TestBed.configureTestingModule({
 providers: [FileTransferGlobalService,
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



it('should be created', inject([FileTransferGlobalService], (service: FileTransferGlobalService) => {
expect(service).toBeTruthy();
}));



it('user exists, adds file in relation to private messages', fakeAsync(() => {

const mockResponse = word.mockResponsePositiveOneOne

let service: FileTransferGlobalService = getTestBed().get(FileTransferGlobalService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------

let formData:FormData
service.sendFileOneOne(formData,word.id ,word.id).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   console.log(res)
   expect(res).toBe(word.mockResponsePositiveOneOne);
   tick();
   expect(res.error).toBe(false);
   
 });
}));

it('user exists, adds file in relation to general messages', fakeAsync(() => {

const mockResponse = word.mockResponsePositiveGeneral

let service: FileTransferGlobalService = getTestBed().get(FileTransferGlobalService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------

let formData:FormData
service.sendFileGeneral(formData,word.id).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   console.log(res)
   expect(res).toBe(word.mockResponsePositiveGeneral);
   tick();
   expect(res.error).toBe(false);
   
 });
}));








});

