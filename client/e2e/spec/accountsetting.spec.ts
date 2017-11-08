/* 

Name:shivangi sharma

*/

//------------------------------------------imported files--------------------------------------------//

import { browser,element,by } from 'protractor';
import { AccountSettingsComponent } from '../../src/app/account-settings/account-settings.component';

//-----------------------------------------test Suit---------------------------------------//

describe('AccountSettingsComponent', () => {

//-----------------------------------------positive test case---------------------------------------//

 
  
  it('prof',()=>{
    browser.get("http://localhost:49152/dashboard/accountSettings");
    expect(element(by.id('profile')).getText()).toEqual("Profile");
  })
  it('password',()=>{
    expect(element(by.id('password')).getText()).toEqual("Password");
  })
  it('pic',()=>{
    expect(element(by.id('pic')).getText()).toEqual("Profile Photo");
  })
  it('status',()=>{
    expect(element(by.id('status')).getText()).toEqual("Status");
  })
  it('ustatus',()=>{
    expect(element(by.id('ustatus')).getText()).toEqual("Update Status");
  })
 
 it('cont',()=>{
    expect(element(by.id('cont')).getText()).toEqual("Contact");
  })
 it('status',()=>{
    element(by.id('status')).sendKeys('hi this is shivangi');
  })
 
 it('ucontact',()=>{
    expect(element(by.id('ucontact')).getText()).toEqual("Update Contact");
  })
 it('ucontact',()=>{
    element(by.name('ucontact')).sendKeys('8266862886');
  })

 it('ucontact',()=>{
    element(by.id('ucontact')).click();
  })
  it('ustatus',()=>{
    element(by.id('ustatus')).click();
  })
  it('opass',()=>{
    expect(element(by.id('opass')).getText()).toEqual("Old Password");
  })
 it('opass',()=>{
    element(by.id('opass')).sendKeys('1234');
  })
  it('npass',()=>{
    expect(element(by.id('npass')).getText()).toEqual("New Password");
  })
 it('npass',()=>{
    element(by.id('npass')).sendKeys('12345');
  })
  it('cpass',()=>{
    expect(element(by.id('profile')).getText()).toEqual("Confirm Password");
  })
 it('cpass',()=>{
    element(by.n('input')).sendKeys('12345');
  })
 it('save',()=>{
    element(by.id('save')).click();
  })
 it('uupic',()=>{
    element(by.id('uupic')).click();
  })

 })

