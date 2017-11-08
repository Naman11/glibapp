/*   * By : Vismita Pavdighada
     * Version : Spec 1.0   
     * Date : 27 -October - 2017  
*/

/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { RouterTestingModule }  from '@angular/router/testing';
import { AccountSettingsComponent } from './account-settings.component';
import { AccountSettingsService } from './account-settings.service';
import { By } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as config from './config/account-settings.test.config.json';
import 'rxjs/add/observable/of';


describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
    let service: AccountSettingsService;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let de: DebugElement;
  let el:      HTMLElement;
  let titleElement:      HTMLElement;
  let spy1:any;
  let spy2:any;
  let word= (<any>config);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
                  HttpModule,
                  RouterModule,
                  //Router,
                  BrowserAnimationsModule,
                  RouterTestingModule
                  ],
      declarations: [ AccountSettingsComponent ],
      providers: [ AccountSettingsService ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    
    
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    service = TestBed.get(AccountSettingsService);
    spy1 = spyOn(service, 'fetchUserInfo').and.returnValue(Observable.of(word.data));
    spy2 = spyOn(service, 'getProfilePhoto').and.returnValue(Observable.of("image in base 64"));
    fixture.detectChanges()
  });
  it('Component definition', () => {
    expect(component).toBeDefined();
  });
  it('getsUserData', () => {
    
      
      
      expect(spy1).toBeDefined();
      expect(spy2).toBeDefined();
      expect(component.userData).toBe(word.data);
      expect(component.profilePhoto).toBe("image in base 64")
      
  });
  

});
*/