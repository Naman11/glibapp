import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
  import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
  Response, ResponseOptions,RequestMethod} from '@angular/http';
  import {MockBackend, MockConnection } from '@angular/http/testing'
  import { RouterTestingModule } from '@angular/router/testing';
  import { By }              from '@angular/platform-browser';
  import { DebugElement }    from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { GeneralService } from './general.service';
  import { FileTransferGlobalService} from '../../shared/file-transfer-global.service';
import * as config from './config/general.test.config.json';
describe('GeneralService', () => {
    let de:  DebugElement;
    let el:  HTMLElement;
    let mockBackend:any;
    let service:any;
    let codeData=(<any>config).codeData;
    let codeDataNegative=(<any>config).codeDataNegative;
    let codeDataNegativeAll=(<any>config).codeDataNegativeAll;
    let codeMockResponse=(<any>config).codeMockResponse;
    let codeMockResponseNegative=(<any>config).codeMockResponseNegative;
    let codeMockResponseNegativeAll=(<any>config).codeMockResponseNegativeAll;

    let messageData=(<any>config).messageData;
    let messageMockResponse=(<any>config).messageMockResponse;    
    let messageMockResponseNegative=(<any>config).messageMockResponseNegative;
    let messageMockResponseNegativeBoth=(<any>config).messageMockResponseNegativeBoth;

    let getCodeByIdResponse=(<any>config).getCodeByIdResponse; 
    let codeDataL = (<any>config).codeDataL;
    let getCodeByIdResponseNotEqual= (<any>config).getCodeByIdResponseNotEqual;
    let getCodeByIdResponseSome= (<any>config).getCodeByIdResponseSome;

    let retrieveMessageData=(<any>config).retrieveMessageData;
    let retrieveMessageResponse = (<any>config).retrieveMessageResponse;
    let retrieveMessageResponseNotEqual= (<any>config).retrieveMessageResponseNotEqual;
    let retrieveMessageResponseSome = (<any>config).retrieveMessageResponseSome;

    let randomVariable= (<any>config).randomVariable;


    /*intialize all the variable*/
    beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule,RouterModule,RouterTestingModule],
        providers: [GeneralService,FileTransferGlobalService,
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
     providers: [{provide : GeneralService}]
   });
  });

  it('should be created', inject([GeneralService], (service: GeneralService) => {
    expect(service).toBeTruthy();
  }));

  it('check saveCode successfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.saveCode(codeData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(codeMockResponse.ok);
          tick();
          expect(res.n).toBe(codeMockResponse.n);
          tick();
        });
    }));

  it('check saveCode unsuccessfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.saveCode(codeData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(codeMockResponse.ok);
          tick();
          expect(res.n).not.toEqual(codeMockResponse.n);
          tick();
        });
    }));
  it('check saveCode unsuccessfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.saveCode(codeData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).not.toEqual(undefined);
          tick();
        });
    }));
    it('check saveCode unsuccessfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeMockResponseNegativeAll})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.saveCode(codeData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).not.toEqual(codeMockResponse.ok);
          tick();
          expect(res.n).not.toEqual(codeMockResponse.n);
          tick();
        });
    }));

    it('check getCodeDatas successfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeData})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.getCodeDatas().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.code.codeId).toBe(codeData.code.codeId);
          tick();
          expect(res.code.code).toBe(codeData.code.code);
          tick();
        });
    }));

it('check getCodeDatas unsuccessfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeDataNegativeAll})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.getCodeDatas().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.code.codeId).not.toEqual(undefined);
          tick();
        });
    }));

    it('check getCodeDatas unsuccessfull', fakeAsync(() => {
      let service: GeneralService = getTestBed().get(GeneralService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:codeDataNegativeAll})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      service.getCodeDatas().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.code.codeId).not.toEqual(codeData.code.codeId);
          tick();
          expect(res.code.code).not.toEqual(codeData.code.code);
          tick();
        });
    }));







 //------------------------------enter the message in database corresponding to a user-----------------//
  it('Enter Message into database', fakeAsync(() => {

    let username=randomVariable.username;
    let message=randomVariable.message;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponse})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.saveMessage(this.username,this.message).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(messageData.ok);
          tick();
          expect(res.n).toBe(messageData.n);
          tick();
        });
    }));

 //--Message is not enter in the database(Negative test case when even single response in not matched)-----------------//
  it('Enter Message into database negative test case', fakeAsync(() => {

    let username=randomVariable.username;
    let message=randomVariable.message;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponseNegative})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------
      generalService.saveMessage(this.username,this.message).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(messageData.ok);
          tick();
          expect(res.n).not.toEqual(messageData.n);
          tick();
        });
    }));




 //--Message is not enter in the database(Undefined)-----------------//
  it('Enter Message into database negative test case data undefined', fakeAsync(() => {

    let username=randomVariable.username;
    let message=randomVariable.message;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponseNegative})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------
      generalService.saveMessage(this.username,this.message).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).not.toEqual(undefined);
          tick();
          expect(res.n).not.toEqual(undefined);
          tick();
        });
    }));



//--------Message is not enter in the database(Negative test case when both response in not matched)-----------------//
  it('Enter Message into database negative test case when both the response are not matching', fakeAsync(() => {
   
    let username=randomVariable.username;
    let message=randomVariable.message;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponseNegativeBoth})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------
      generalService.saveMessage(this.username,this.message).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).not.toEqual(messageData.ok);
          tick();
          expect(res.n).not.toEqual(messageData.n);
          tick();
        });
    }));





   //------------------------------get the code by id-----------------//
  it('get the code by id', fakeAsync(() => {
      let codeId= randomVariable.codeId;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:getCodeByIdResponse})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.getCodeDatasById(codeId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).toBe(codeDataL._id);
          tick();
          expect(res.username).toBe(codeDataL.username);
          tick();
          expect(res.timestamp).toBe(codeDataL.timestamp);
          tick();
          expect(res.code.codeId).toBe(codeDataL.code.codeId);
          tick();
        });
    }));


     //------------------------------the response is expected not to be undefined----------------//
  it('get the code by id(Response is not equal to undefined)', fakeAsync(() => {
      let codeId= randomVariable.codeId;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:getCodeByIdResponse})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.getCodeDatasById(codeId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(undefined);
          tick();
          expect(res.username).not.toEqual(undefined);
          tick();
          expect(res.timestamp).not.toEqual(undefined);
          tick();
          expect(res.code.codeId).not.toEqual(undefined);
          tick();
        });
    }));

  //------------------------------the response is not equal to the expectations----------------//
  it('the response is not equal to the expectations', fakeAsync(() => {
      let codeId= randomVariable.codeId;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:getCodeByIdResponseNotEqual})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.getCodeDatasById(codeId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(codeDataL._id);
          tick();
          expect(res.username).not.toEqual(codeDataL.username);
          tick();
          expect(res.timestamp).not.toEqual(codeDataL.timestamp);
          tick();
          expect(res.code.codeId).not.toEqual(codeDataL.code.codeId);
          tick();
        });
    }));

  //------------------------------when a single or multiple resonse attributes are not matching the expectations----------------//
  it('the response is not equal to the expectations', fakeAsync(() => {
      let codeId= randomVariable.codeId;
      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:getCodeByIdResponseSome})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.getCodeDatasById(codeId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(codeDataL._id);
          tick();
          expect(res.username).toBe(codeDataL.username);
          tick();
          expect(res.timestamp).not.toEqual(codeDataL.timestamp);
          tick();
          expect(res.code.codeId).toBe(codeDataL.code.codeId);
          tick();
        });
    }));



   //------------------------------retrieve message-----------------//
  it('Retireve Message', fakeAsync(() => {

      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:retrieveMessageResponse})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.retrieveMessage().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).toBe(retrieveMessageData._id);
          tick();
          expect(res.username).toBe(retrieveMessageData.username);
          tick();
          expect(res.message.message).toBe(retrieveMessageData.message.message);
          tick();
        });
    }));




  //------------------------------retrieve message undefined-----------------//
  it('Retireve Message is not expected to undefined', fakeAsync(() => {

      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:retrieveMessageResponse})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.retrieveMessage().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(undefined);
          tick();
          expect(res.username).not.toEqual(undefined);
          tick();
          expect(res.message.message).not.toEqual(undefined);
          tick();
        });
    }));


   //------------------------------retrieve message-----------------//
  it('Retireve Message is not at all what was expected', fakeAsync(() => {

      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:retrieveMessageResponseNotEqual})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.retrieveMessage().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(retrieveMessageData._id);
          tick();
          expect(res.username).not.toEqual(retrieveMessageData.username);
          tick();
          expect(res.message.message).not.toEqual(retrieveMessageData.message.message);
          tick();
        });
    }));



   //------------------------------retrieve message-----------------//
  it('Retireve Message is not at all what was expected', fakeAsync(() => {

      let generalService: GeneralService = getTestBed().get(GeneralService);
      this.mockBackend=TestBed.get(MockBackend);
      this.mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:retrieveMessageResponseSome})));
        tick();
      }); 
      //-------------------service method testing here--------------------------------//
      generalService.retrieveMessage().subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res._id).not.toEqual(retrieveMessageData._id);
          tick();
          expect(res.username).toBe(retrieveMessageData.username);
          tick();
          expect(res.message.message).not.toEqual(retrieveMessageData.message.message);
          tick();
        });
    }));

 // Describe closed
  });