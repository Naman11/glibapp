import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { MailotpService } from './mailotp.service';
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
let word= (<any>config).mailotpService;
beforeEach( async(() => {
TestBed.configureTestingModule({
 providers: [MailotpService,
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



it('should be created', inject([MailotpService], (service: MailotpService) => {
expect(service).toBeTruthy();
}));



it('email exists, sends mail', fakeAsync(() => {

const mockResponse = word.sendMailPositive

let service: MailotpService = getTestBed().get(MailotpService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------

service.sendMailOTP(word.email, word.subject, word.component).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   //console.log(res)
   expect(res).toBe(word.sendMailPositive);
   
   
 });
}));

it('email doesnt exist, doesnt send mail', fakeAsync(() => {

const mockResponse = word.sendMailNegative

let service: MailotpService = getTestBed().get(MailotpService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------


service.sendMailOTP(word.email, word.subject, word.component).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   //console.log(res)
   expect(res).not.toBe(word.sendMailPositive);
   
   
 });
}));

it('correct OTP', fakeAsync(() => {

const mockResponse = word.verifyOTPPositive

let service: MailotpService = getTestBed().get(MailotpService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------

service.checkOTP(word.otp).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   //console.log(res)
   expect(res).toBe(word.verifyOTPPositive);
   
   
 });
}));

it('wrong OTP', fakeAsync(() => {

const mockResponse = word.verifyOTPNegative

let service: MailotpService = getTestBed().get(MailotpService);
mockBackend=TestBed.get(MockBackend);
mockBackend.connections.subscribe((connection: MockConnection) => {
 expect(connection.request.method).toBe(RequestMethod.Post);
 tick();
 let Resp = new Response(new ResponseOptions({body:mockResponse}));
 connection.mockRespond(Resp);
 tick();          
});
//-------------------service method testing here--------------------------------

service.checkOTP(word.otp).subscribe(
 (res) => {           
   expect(res).toBeDefined();
   tick();
   //console.log(res)
   expect(res).not.toBe(word.verifyOTPPositive);
   
   
 });
}));








});

