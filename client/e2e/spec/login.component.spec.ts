/* 
	   Name:shivangi sharma

	   */

	   //------------------------------------------imported files--------------------------------------------//

	   import { browser,element,by } from 'protractor';
	   import { LoginComponent } from '../../src/app/login/login.component';

	   //-----------------------------------------test Suit---------------------------------------//

	   describe('PositiveLoginComponent', () => {

	   	//-----------------------------------------positive test case---------------------------------------//
	  
	   	it('h1',()=>{
	   		browser.get("http://localhost:49152/login");
	   		expect(element(by.id('h1')).getText()).toEqual("Log in with your User Name");
	   	})
	   	it('l1',()=>{
	   		expect(element(by.id('l1')).getText()).toEqual("Email");
	   	})
	   	it('e1',()=>{
	   		element(by.id('e1')).sendKeys('shivangisharma');
	   	})
	   	it('pass',()=>{
	   		expect(element(by.id('pass')).getText()).toEqual("Password");
	   	})
	   	it('key',()=>{
	   		element(by.name('key')).sendKeys('1234');
	   	})
	   	it('btn-login',()=>{
	   		element(by.id('btn-login')).click();
	   	})
   });

