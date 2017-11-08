  import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
  import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
  Response, ResponseOptions,RequestMethod} from '@angular/http';
  import {MockBackend, MockConnection } from '@angular/http/testing'
  import { RouterTestingModule } from '@angular/router/testing';
  import { By }              from '@angular/platform-browser';
  import { DebugElement }    from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import * as config from './http.test.config.json';
  import { HttpService } from './http.service';

describe('HttpService', () => {
    let de:  DebugElement;
    let el:  HTMLElement;
    let mockBackend:any;
    let service:any;
    let data=(<any>config).data;
    let registerData=(<any>config).registerData;
    let mockResponse=(<any>config).mockResponse;
    let mockResponseNegative=(<any>config).mockResponseNegative;
    let loginMockResponse=(<any>config).loginMockResponse;
    let registerUserMockResponse=(<any>config).registerUserMockResponse;
    let registerUserMockResponseNegative=(<any>config).registerUserMockResponseNegative;
    let registerUserMockResponseNegativeE=(<any>config).registerUserMockResponseNegativeE;
    let loginData=(<any>config).loginData;
    let loginMockResponseNegativeU=(<any>config).loginMockResponseNegativeU;
    let loginMockResponseNegativeP=(<any>config).loginMockResponseNegativeP;
    let dataId=(<any>config).dataId;
    let mockResponseId=(<any>config).mockResponseId;
    let mockResponseNegativeId=(<any>config).mockResponseNegativeId;
    let messageData=(<any>config).messageData;
    let messageMockResponse=(<any>config).messageMockResponse;
    let messageMockResponseNegative=(<any>config).messageMockResponseNegative;
    let messageMockResponseNegativeAll=(<any>config).messageMockResponseNegativeAll;
    let scrapingData=(<any>config).scrapingData;
    let scrapingMockResponse=(<any>config).scrapingMockResponse;
    let scrapingMockResponseNegative=(<any>config).scrapingMockResponseNegative;
    let flagData=(<any>config).flagData;
    let flagMockResponse=(<any>config).flagMockResponse;
    let flagMockResponseNegative=(<any>config).flagMockResponseNegative;

    /*intialize all the variable*/
    beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule,HttpModule,RouterModule,RouterTestingModule],
        providers: [HttpService,
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
     providers: [{provide : HttpService}]
   });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

      it('check userNameCheck successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userNameCheck(data).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).toBe(data.Username);
          tick();
        });
    }));
            it('check userNameCheck unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userNameCheck(data).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).not.toEqual(data.Username);
          tick();
        });
    }));

    it('check userNameCheck unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userNameCheck(data).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).not.toEqual(undefined);
          tick();
        });
    }));


it('check login successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:loginMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.login(loginData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).toBe(loginData.Username);
          tick();
          expect(res.Password).toBe(loginData.Password);
          tick();
        });
    }));

it('check login unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:loginMockResponseNegativeU})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.login(loginData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).not.toEqual(loginData.Username);
          tick();
          expect(res.Password).toBe(loginData.Password);
          tick();
        });
    }));

it('check login unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:loginMockResponseNegativeU})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.login(loginData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).not.toEqual(undefined);
          tick();
        });
    }));


it('check login unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:loginMockResponseNegativeP})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.login(loginData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Username).toBe(loginData.Username);
          tick();
          expect(res.Password).not.toEqual(loginData.Password);
          tick();
        });
    }));

it('check registerUser successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:registerUserMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.registerUser(registerData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Email).toBe(registerData.Email);
          tick();
          expect(res.Username).toBe(registerData.Username);
          tick();
          expect(res.Password).toBe(registerData.Password);
          tick();
        });
    }));

it('check registerUser unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:registerUserMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.registerUser(registerData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Email).toBe(registerData.Email);
          tick();
          expect(res.Username).not.toEqual(registerData.Username);
          tick();
          expect(res.Password).toBe(registerData.Password);
          tick();
        });
    }));

it('check registerUser unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:registerUserMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.registerUser(registerData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Email).not.toEqual(undefined);
          tick();
        });
    }));

it('check registerUser unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:registerUserMockResponseNegativeE})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.registerUser(registerData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Email).not.toEqual(registerData.Email);
          tick();
          expect(res.Username).not.toEqual(registerData.Username);
          tick();
          expect(res.Password).toBe(registerData.Password);
          tick();
        });
    }));


it('check userSessionCheck successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseId})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userSessionCheck(dataId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.UserId).toBe(dataId.UserId);
          tick();
        });
    }));

it('check userSessionCheck unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseNegativeId})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userSessionCheck(dataId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.UserId).not.toEqual(dataId.UserId);
          tick();
        });
    }));

it('check userSessionCheck unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseNegativeId})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.userSessionCheck(dataId).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.UserId).not.toEqual(undefined);
          tick();
        });
    }));

it('check getMessages successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.getMessages(messageData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.userId).toBe(messageData.userId);
          tick();
          expect(res.toUserId).toBe(messageData.toUserId);
          tick();
        });
    }));

it('check getMessages unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.getMessages(messageData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.userId).toBe(messageData.userId);
          tick();
          expect(res.toUserId).not.toEqual(messageData.toUserId);
          tick();
        });
    }));

it('check getMessages unsuccessfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:messageMockResponseNegativeAll})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.getMessages(messageData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.userId).not.toEqual(messageData.userId);
          tick();
          expect(res.toUserId).not.toEqual(messageData.toUserId);
          tick();
        });
    }));


it('check scraping successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:scrapingMockResponse})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.scraping(scrapingData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.url).toBe(scrapingData.url);
          tick();
        });
    }));

it('check scraping successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:scrapingMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.scraping(scrapingData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.url).not.toEqual(scrapingData.url);
          tick();
        });
    }));

it('check scraping successfull', fakeAsync(() => {
      let httpService: HttpService = getTestBed().get(HttpService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:scrapingMockResponseNegative})));
        tick();
      }); /* email verify */
      //-------------------service method testing here--------------------------------
      httpService.scraping(scrapingData).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.url).not.toEqual(undefined);
          tick();
        });
    }));


});
