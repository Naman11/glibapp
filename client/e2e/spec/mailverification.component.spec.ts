/* 

Name:shivangi sharma

		*/

//------------------------------------------imported files--------------------------------------------//

	import { browser,element,by } from 'protractor';
	import { MailverificationComponent } from '../../src/app/mailverification/mailverification.component';
	
//-----------------------------------------test Suit---------------------------------------//

	 describe('PossitiveMailverificationComponent', () => {

 //-----------------------------------------positive test case---------------------------------------//
	   
     
	   it('otp',()=>{
      browser.get("http://localhost:49152/verify");
      expect(element(by.id('app')).getText()).toEqual("GlibApp");
          })
	    it('otp',()=>{
      expect(element(by.id('otp')).getText()).toEqual("Enter the OTP");
          })

	   it('h1',()=>{
	    expect(element(by.id('h1')).getText()).toEqual("Email");
          })
	    it('email',()=>{
	 	element(by.id('email')).sendKeys('342321');
          })
	    it('button click',()=>{
	     element(by.id('btn-login')).click();
        })
	 });

//-----------------------------------------test Suit---------------------------------------//

describe('NegativeMailverificationComponent', () => {

 //----------------------------------------negative test case---------------------------------------//

 it('h1',()=>{
	  	expect(element(by.id('h1')).getText()).not.toEqual("Veriiification");
          })
});
