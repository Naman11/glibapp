/*   * By : Shefali Singh 
     
   */

//---------------------------Importing Modules---------------------------------------------//
import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { SetPasswordService } from './set-password.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions,
  Response, ResponseOptions,RequestMethod} from '@angular/http';
  import {MockBackend, MockConnection } from '@angular/http/testing'
  import { RouterTestingModule } from '@angular/router/testing';
  import { By }              from '@angular/platform-browser';
  import { DebugElement }    from '@angular/core';
  import { SetPasswordComponent } from './set-password.component';
  import { Routes, RouterModule } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { MailotpService} from '../shared/mailotp.service';
  import * as config from './set-password.test.config.json';
//------------------------------------------------------------------------------------------//  
  /*Import all the dependencies*/

//Test Suite for setting new Password//
  describe('Set new Password', () => {
    let de:  DebugElement; 
    let el:  HTMLElement;
    let mockBackend:any;
    let setPasswordService:any;
    let registerbtn:any;
    let mockResponse= (<any>config).mockResponse;
    let mockRes= (<any>config).mockRes;
    let mockResponseNegative= (<any>config).mockResponseNegative;
    let data=(<any>config).data;
    let dataRes=(<any>config).dataRes;
    let dataNegative=(<any>config).dataNegative;
    /*Initialize all the variable*/ 

    beforeEach( async(() => {
      TestBed.configureTestingModule({
        providers: [SetPasswordService,MailotpService,
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
    })); /*create a testbed*/
    
    it('should be created', inject([SetPasswordService], (service: SetPasswordService) => {
      expect(service).toBeTruthy();
    })); /* Set password */

    it('should verify Password', fakeAsync(() => {
      let setPasswordService: SetPasswordService = getTestBed().get(SetPasswordService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Put);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
        tick();
      }); /*Verify password*/
      //-------------------service method testing here--------------------------------
      setPasswordService.changePassword(data).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(data.ok);
          tick();
          expect(res.nModified).toBe(data.nModified);
          tick();
          expect(res.n).toBe(data.n);
          tick();

        });
    }));
//Test Case for not verifying Password//
    it('should not verify Password', fakeAsync(() => {
      const mockResponse = {
        ok:1,
        nModified:1,
        n:1
      }; /*Mock the data*/
      let setPasswordService: SetPasswordService = getTestBed().get(SetPasswordService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Put);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
        tick();
      });
      //-------------------service method testing here--------------------------------
      setPasswordService.changePassword(dataNegative).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.ok).toBe(dataNegative.ok);
          tick();
          expect(res.nModified).not.toEqual(dataNegative.nModified);
          tick();
          expect(res.n).not.toEqual(dataNegative.n);
          tick();

        }); /*Check the responses (Expect them)*/
    }));
//Test Case for Password and Confirm Password Matching//
    it('Password and Confirm Password Matching', fakeAsync(() => {
      let setPasswordService: SetPasswordService = getTestBed().get(SetPasswordService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Put);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockRes})));
        tick();
      });
      //-------------------service method testing here--------------------------------
      setPasswordService.changePassword(dataRes).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Password).toBe(res.ConfirmPassword);
          tick();

        });
    }));
//Test Case for Password and Confirm Password not Matching//
    it('Password and Confirm Password not Matching', fakeAsync(() => {
      let setPasswordService: SetPasswordService = getTestBed().get(SetPasswordService);
      mockBackend=TestBed.get(MockBackend);
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Put);
        tick();
        connection.mockRespond(new Response(new ResponseOptions({body:mockResponseNegative})));
        tick();
      }); /* Check the password and Confirm password */
      //-------------------service method testing here--------------------------------
      setPasswordService.changePassword(dataRes).subscribe(
        (res) => {
          expect(res).toBeDefined();
          tick();
          expect(res.Password).not.toEqual(res.ConfirmPassword);
          tick();

        });
    }));

  });
