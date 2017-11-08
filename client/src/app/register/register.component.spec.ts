/*   * By : Rumani Jain 
     * Version : Spec 1.0   
     * Date : 24 -October - 2017  
     */
    /*importing all the files we need*/
     import { async, ComponentFixture, TestBed } from '@angular/core/testing';
     import { DebugElement } from '@angular/core';
     import { FormsModule} from '@angular/forms';
     import { HttpModule} from '@angular/http';
     import { RouterModule } from '@angular/router';
     import { Router } from '@angular/router';
     import {Observable} from 'rxjs/Observable';
     import { RouterTestingModule }  from '@angular/router/testing';
     import { RegisterComponent } from './register.component';
     import { RegisterService } from '../shared/register.service';
     import { By } from '@angular/platform-browser';
     import { MailotpService} from '../shared/mailotp.service';
     import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
     import 'rxjs/add/observable/of';

     /*test suite for register component*/
     describe('RegisterComponent', () => {

       let component: RegisterComponent;
       let service: RegisterService;
       let serviceOTP: MailotpService;
       let fixture: ComponentFixture<RegisterComponent>;
       let de: DebugElement;
       let el: HTMLElement;
       let titleElement: HTMLElement;
       let spy:any;
       beforeEach(async(() => {
         TestBed.configureTestingModule({
           imports: [ FormsModule,
           HttpModule,
           RouterModule,
           BrowserAnimationsModule,
           RouterTestingModule
           ],
           declarations: [ RegisterComponent ],
           providers: [ RegisterService, MailotpService ]
         })
         .compileComponents();
       }));
       beforeEach(() => {
         fixture = TestBed.createComponent(RegisterComponent);
         component = fixture.componentInstance;
         fixture.detectChanges();
         console.log("register comp test",component);
         service = TestBed.get(RegisterService);
         serviceOTP = TestBed.get(MailotpService);
         component.username="Rekha Sharma"
         component.email="rkha@gmail.com"
         component.password="pass"
       });
       /*test case for component to exist*/
       it('Component definition', () => {
         expect(component).toBeDefined();
       });
       /*test case for register action*/
       it('registerAction', () => {
         spy = spyOn(service, 'tempUser').and.returnValue(service.data = component.data);
         expect(spy).toBeDefined();
         expect(service.data).toBe(component.data)

       });
       /*test case for sending the email*/
       it('should send email', () => {
         spyOn(service, 'tempUser').and.returnValue(service.data = component.data);
         spyOn(serviceOTP, 'sendMailOTP').and.returnValue(Observable.of({"message":"250 2.0.0 OK 1507360855 a25sm6437573pfc.143 - gsmtp"}));   // <------- USE THIS "res" as flag as basis to call your second spy
         component.registerUser()
         fixture.detectChanges()
          expect(component.result).toBe("250 2.0.0 OK 1507360855 a25sm6437573pfc.143 - gsmtp")

       });
     });


