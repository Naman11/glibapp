import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as config from './config/globalServices.test.config.json';
describe('RegisterService', () => {
 let de:  DebugElement;
 let el:  HTMLElement;
 let mockBackend:any;
 let registerService:any;
 let data:any;
 let word= (<any>config).registerService;
 beforeEach( async(() => {
   TestBed.configureTestingModule({
     providers: [RegisterService,
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
 it('should be created', inject([RegisterService], (service: RegisterService) => {
   expect(service).toBeTruthy();
 }));
 it('should register the user to backend', fakeAsync(() => {
   const mockResponse = word.mockResponsePositive
   let registerService: RegisterService = getTestBed().get(RegisterService);
   mockBackend=TestBed.get(MockBackend);
   mockBackend.connections.subscribe((connection: MockConnection) => {
     expect(connection.request.method).toBe(RequestMethod.Post);
     tick();
     let Resp = new Response(new ResponseOptions({body:mockResponse}));
     connection.mockRespond(Resp);
     tick();          
   });
   //-------------------service method testing here--------------------------------
   let object = word.mockResponsePositive
   registerService.tempUser(object);
   expect(registerService.data).toBe(object);
   registerService.register().subscribe(
     (res) => {           
       expect(res).toBeDefined();
       tick();
       expect(res.Email).toBe(object.Email);
       tick();
       expect(res.Password).toBe(object.Password);
     });
 }));

 it('should not register the user to backend', fakeAsync(() => {
   const mockResponse = word.mockResponseNegative;
   let registerService: RegisterService = getTestBed().get(RegisterService);
   mockBackend=TestBed.get(MockBackend);
   mockBackend.connections.subscribe((connection: MockConnection) => {
     expect(connection.request.method).toBe(RequestMethod.Post);
     tick();
     let Resp = new Response(new ResponseOptions({body:mockResponse}));
     connection.mockRespond(Resp);
     tick();            

   });
   //-------------------service method testing here--------------------------------
   let object = word.mockResponsePositive
   registerService.tempUser(object);
   expect(registerService.data).toBe(object);
   registerService.register().subscribe(
     (res) => {              
       expect(res).toBeDefined();
       tick();
       expect(res).toBe(word.mockResponseNegative);
     });
 }));
});

