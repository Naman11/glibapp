	import { ChatsService } from './chats.service';
	import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
  import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
  Response, ResponseOptions,RequestMethod} from '@angular/http';
  import {MockBackend, MockConnection } from '@angular/http/testing'
  import { RouterTestingModule } from '@angular/router/testing';
  import { By }              from '@angular/platform-browser';
  import { DebugElement }    from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { FileTransferGlobalService} from '../../shared/file-transfer-global.service';
  import { GetInfoService} from '../../shared/get-info.service';
	import * as config from './config/chat.test.config.json';

describe('ChatsService', () => {
    
  let de:  DebugElement;
  let el:  HTMLElement;
  let mockBackend:any;
  let chatMockResponse= (<any>config).chatMockResponse;
  let randomVariables= (<any>config).randomVariables;
  let chatMockResponseNotSame= (<any>config).chatMockResponseNotSame;
  let chatMockResponseNotEqual= (<any>config).chatMockResponseNotEqual;
  let uploadResponse= (<any>config).uploadResponse;
  let uploadResponseNotSame = (<any>config).uploadResponseNotSame;
  let uploadResponseNotEqual= (<any>config).uploadResponseNotEqual
	/*intialize all the variable*/
  beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule,RouterModule,RouterTestingModule],
        providers: [ChatsService,FileTransferGlobalService,GetInfoService,
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
   })); /*Create a testbed*/


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatsService]
    });
  });


  it('should be created', inject([ChatsService], (service: ChatsService) => {
    expect(service).toBeTruthy();
  }));

  //---------------------------------Get profile photo-----------------------------//
  it('Get profile photo ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:chatMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.getProfilePhoto(randomVariables.id).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).toBe(chatMockResponse.message);
          tick();
          expect(res.result.email).toBe(chatMockResponse.result.email);
          tick();
          expect(res.result.reciever[0].fromId).toBe(chatMockResponse.result.reciever[0].fromId);
          tick();
        });
    }));



  //---------------------------------Get profile photo (Response is not equal to undefined)-----------------------------//
  it('Get profile photo (Response is not equal to undefined) ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:chatMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.getProfilePhoto(randomVariables.id).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(undefined);
          tick();
          expect(res.result.email).not.toEqual(undefined);
          tick();
          expect(res.result.reciever[0].fromId).not.toEqual(undefined);
          tick();
        });
    }));



  //---------------Get profile photo (Whole of the response is not in accordance to what is expeced)--------------//
  it('Get profile photo (Response is not exactly same to expectations) ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:chatMockResponseNotSame})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.getProfilePhoto(randomVariables.id).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(chatMockResponse.message);
          tick();
          expect(res.result.email).not.toEqual(chatMockResponse.result.email);
          tick();
          expect(res.result.reciever[0].fromId).toBe(chatMockResponse.result.reciever[0].fromId);
          tick();
        });
    }));


   //---------------Get profile photo (Whole of the response is not what was expected)--------------//
  it('Get profile photo (Whole of the response is not what was expected) ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:chatMockResponseNotEqual})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.getProfilePhoto(randomVariables.id).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(chatMockResponse.message);
          tick();
          expect(res.result.email).not.toEqual(chatMockResponse.result.email);
          tick();
          expect(res.result.reciever[0].fromId).not.toEqual(chatMockResponse.result.reciever[0].fromId);
          tick();
        });
    }));


  //------------------------------uploadFile--------------------------------------------//
    it('uploadFile ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:uploadResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.uploadFile(randomVariables.formData,randomVariables.fromId,randomVariables.toId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).toBe(uploadResponse.message);
          tick();
          expect(res.response.finalData.file.fileMIME).toBe(uploadResponse.response.finalData.file.fileMIME);
          tick();
          expect(res.response.finalData.fromUserId).toBe(uploadResponse.response.finalData.fromUserId);
          tick();
        });
    }));



      //------------------------------uploadFile (Response is not equal to undefined)--------------------------------------------//
    it('uploadFile (Response is not equal to undefined) ', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:uploadResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.uploadFile(randomVariables.formData,randomVariables.fromId,randomVariables.toId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(undefined);
          tick();
          expect(res.response.finalData.file.fileMIME).not.toEqual(undefined);
          tick();
          expect(res.response.finalData.fromUserId).not.toEqual(undefined);
          tick();
        });
    }));



          //------------------------------uploadFile (Response is not exactly same as what is expected)--------------------------------------------//
    it('uploadFile (Response is not exactly same as what is expected)', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:uploadResponseNotSame})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.uploadFile(randomVariables.formData,randomVariables.fromId,randomVariables.toId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(uploadResponse.message);
          tick();
          expect(res.response.finalData.file.fileMIME).not.toEqual(uploadResponse.response.finalData.file.fileMIME);
          tick();
          expect(res.response.finalData.fromUserId).toBe(uploadResponse.response.finalData.fromUserId);
          tick();
        });
    }));



              //------------------------------uploadFile (Response is not at all what was expected)--------------------------------------------//
    it('uploadFile (Response is not at all what was expected)', fakeAsync(() => {
      let chatsService: ChatsService = getTestBed().get(ChatsService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:uploadResponseNotEqual})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      chatsService.uploadFile(randomVariables.formData,randomVariables.fromId,randomVariables.toId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.message).not.toEqual(uploadResponse.message);
          tick();
          expect(res.response.finalData.file.fileMIME).not.toEqual(uploadResponse.response.finalData.file.fileMIME);
          tick();
          expect(res.response.finalData.fromUserId).not.toEqual(uploadResponse.response.finalData.fromUserId);
          tick();
        });
    }));

});
