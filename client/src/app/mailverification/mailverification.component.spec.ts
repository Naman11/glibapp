/*   * By : Rumani Jain 
     * Version : Spec 1.0   
     * Date : 24 -October - 2017  
*/


   //-----------------------------IMPORTING MODULES--------------------------------------------//
   import { async, ComponentFixture, TestBed } from '@angular/core/testing';
   import { DebugElement } from '@angular/core';
   import { FormsModule} from '@angular/forms';
   import { HttpModule} from '@angular/http';
   import { RouterModule } from '@angular/router';
   import { Router } from '@angular/router';
   import { RouterTestingModule }  from '@angular/router/testing';
   import { MailverificationComponent } from './mailverification.component';
   import { By } from '@angular/platform-browser';
   import { MailotpService} from '../shared/mailotp.service';
   import { RegisterService} from '../shared/register.service';
   import {Observable} from 'rxjs/Observable';
   import * as config from './mailverification.test.config.json';
   import  'rxjs/add/observable/of';
   //------------------------------------------------------------------------------------------
   //Test Suite for MailverificationComponent// 
   describe('MailverificationComponent', () => {
     let component: MailverificationComponent;
     let service :RegisterService;
     let serviceOTP: MailotpService;
     let fixture: ComponentFixture<MailverificationComponent>;
     let de: DebugElement;
     let el:      HTMLElement;
     let titleElement:      HTMLElement;
     let spy:any;
     let word= (<any>config);
     /*Setting up the test bed */
     beforeEach(async(() => {
       TestBed.configureTestingModule({ 
         imports: [ FormsModule,
         HttpModule,
         RouterModule,
         //Router,
         RouterTestingModule
         ],
         declarations: [ MailverificationComponent ],
         providers: [ MailotpService, RegisterService ]
       })
       .compileComponents();
     }));
     beforeEach(() => {  
       fixture = TestBed.createComponent(MailverificationComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();   
       serviceOTP = TestBed.get(MailotpService);
       service = TestBed.get(RegisterService);
     });

     it('Component definition', () => {
       expect(component).toBeDefined();
     });

     it('correct otp submitted', () => {
       let res:any;
       let data =word.data;
       spyOn(serviceOTP, 'checkOTP').and.returnValue(Observable.of(word.message).subscribe((res)=>{
         this.res = res
         spyOn(service, 'register').and.returnValue(Observable.of(service.data).subscribe((res)=>{
           expect(res).toBe(service.data)
         }));
       }));
     });
//Test Case for wrong otp
     it('wrong otp submitted', () => {
       let res:any;
       spyOn(serviceOTP, 'checkOTP').and.returnValue(component.valid = false);
       //console.log("wrong otp" + component.valid)

       if(component.valid==false){
         expect(res).toBeUndefined
       }

     });

   });





