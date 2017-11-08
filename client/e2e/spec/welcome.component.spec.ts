
/* 

Name:shivangi sharma

*/

//------------------------------------------imported files--------------------------------------------//

import { browser,element,by } from 'protractor';
import { WelcomeComponent } from '../../src/app/welcome/welcome.component';

//-----------------------------------------test Suit---------------------------------------//

describe('WelcomeComponent', () => {

//-----------------------------------------positive test case---------------------------------------//

it('glib',()=>{
	  browser.get("http://localhost:49152/welcome");
    expect(element(by.id('glib')).getText()).toEqual("GlibApp");
  })
it('login',()=>{
    expect(element(by.id('login')).getText()).toEqual("LOGIN");
  })
it('reg',()=>{
    expect(element(by.id('reg')).getText()).toEqual("REGISTER");
  })
it('meet',()=>{
    expect(element(by.id('sub')).getText()).toEqual("IDEAS | FAITH | ACTION");
  })
it('header',()=>{
    expect(element(by.id('header')).getText()).toEqual("WE INSPIRE");
  })
it('PP',()=>{
    expect(element(by.id('PP')).getText()).toEqual("Privacy Policy");
  })
it('TU',()=>{
    expect(element(by.id('TU')).getText()).toEqual("Terms of Use");
  })
});

//-----------------------------------------test Suit---------------------------------------//

describe('WelcomeComponent', () => {

//-----------------------------------------Negative test case---------------------------------------//

it('glib',()=>{
    expect(element(by.id('glib')).getText()).not.toEqual("GlllibApp");
  })
it('login',()=>{
    expect(element(by.id('login')).getText()).not.toEqual("LGIN");
  })
it('reg',()=>{
    expect(element(by.id('reg')).getText()).not.toEqual("REGSTER");
  })
it('meet',()=>{
    expect(element(by.id('sub')).getText()).not.toEqual("ITICE TO MEET YOU");
  })
it('header',()=>{
    expect(element(by.id('header')).getText()).not.toEqual("Welc To Our Studio!");
  })
it('PP',()=>{
    expect(element(by.id('PP')).getText()).not.toEqual("Privacy Pocy");
  })
it('TU',()=>{
    expect(element(by.id('TU')).getText()).not.toEqual("Terms ose");
  })
});




