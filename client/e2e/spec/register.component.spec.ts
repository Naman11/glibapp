/* 

Name:shivangi sharma

*/

//------------------------------------------imported files--------------------------------------------//

import { browser,element,by } from 'protractor';
import { RegisterComponent } from '../../src/app/register/register.component';

//-----------------------------------------test Suit ---------------------------------------//

describe('PossitiveRegisterComponent', () => {

	//-----------------------------------------positive test case---------------------------------------//


it('h1',()=>{
    browser.get("http://localhost:49152/register");
    expect(element(by.id('h1')).getText()).toEqual("Log in with your User Name");
  })
it('uname',()=>{
    expect(element(by.id('uname')).getText()).toEqual("User Name");
  })
it('username',()=>{
		element(by.id('username')).sendKeys('shivangi');
	});
it('etext',()=>{
    expect(element(by.id('etext')).getText()).toEqual("Email");
  })
it('email',()=>{
		element(by.name('email')).sendKeys('shivangisharmagmail.com');
	});
it('passtext',()=>{
    expect(element(by.id('passtext')).getText()).toEqual("Password");
  })
it('ctext',()=>{
    expect(element(by.id('ctext')).getText()).toEqual("ConfirmPassword");
  })
it('btn-login',()=>{
    element(by.id('btn-login')).click();
  })	
	});

//-----------------------------------------test Suit ---------------------------------------//

describe('NegativeRegisterComponent', () => {

	//-----------------------------------------Negative test case---------------------------------------//

it('h1',()=>{
   expect(element(by.id('h1')).getText()).not.toEqual("Log in with uuuuyour User Name");
  })
});

			