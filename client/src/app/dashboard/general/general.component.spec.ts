/*Created By - Prerna
Version - 1*/
//----------------------------Importing Modules----------------------------------------------
import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { GeneralComponent } from './general.component';
import { GeneralService } from  './general.service';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FileTransferGlobalService} from '../../shared/file-transfer-global.service';
import * as config from './config/general.test.config.json';
//----------------------------------------------------------------------------------------------

/*Import all dependencies*/

describe('General Component', () => {
let data:any;
let dataotp:any;
let comp: GeneralComponent;
let fixture: ComponentFixture<GeneralComponent>;
let de:      DebugElement;
let el:      HTMLElement;
let service:GeneralService;
let spy:any;
let spyFile:any;

let message:any;
let word= (<any>config);

/* Initialise all the variabless */

beforeEach(() => {
  word.data;
  word.dataotp;
  TestBed.configureTestingModule({
    imports : [
    FormsModule, HttpModule, RouterTestingModule
    ],
    declarations: [
    GeneralComponent
    ],
    providers : [{ provide : GeneralService},{provide : FileTransferGlobalService}]
  })
  .compileComponents();
  fixture = TestBed.createComponent(GeneralComponent);
  comp = fixture.componentInstance;
  service = fixture.debugElement.injector.get(GeneralService);
  de = fixture.debugElement.query(By.css('input'));
  el = de.nativeElement;
}); /*Create the test bed*/

it('Component definition', ()=>{
  expect(comp).toBeDefined();
})      
/*Check whther the component is defined or not*/

it("getCodeDatasById successfull", ()=>{
//let codeID=75343893;
  spy=spyOn(service, 'getCodeDatasById').and.returnValue(Observable.of(word.downloadCodeData));
  //spyFile=spyOn(service, 'uploadFile');
  comp.downloadCode(word.codeId.codeID);
  fixture.detectChanges();
  expect(comp.downloadCodeTesting[0].code.codeId).toEqual(word.downloadCodeData[0].code.codeId);
  expect(comp.downloadCodeTesting[0].code.code).toEqual(word.downloadCodeData[0].code.code);
}); 

it("getCodeDatasById unsuccessfull", ()=>{
//let codeID=75343893;
  spy=spyOn(service, 'getCodeDatasById').and.returnValue(Observable.of(word.downloadCodeData));
  //spyFile=spyOn(service, 'uploadFile');
  comp.downloadCode(word.codeId.codeID);
  fixture.detectChanges();
  expect(comp.downloadCodeTesting[0].code.codeId).not.toEqual(word.downloadCodeDataNegativeAll[0].code.codeId);
  expect(comp.downloadCodeTesting[0].code.code).not.toEqual(word.downloadCodeDataNegativeAll[0].code.code);
}); 

it("getCodeDatasById unsuccessfull", ()=>{
//let codeID=75343893;
  spy=spyOn(service, 'getCodeDatasById').and.returnValue(Observable.of(word.downloadCodeData));
  //spyFile=spyOn(service, 'uploadFile');
  comp.downloadCode(word.codeId.codeID);
  fixture.detectChanges();
  expect(comp.downloadCodeTesting[0].code.codeId).not.toEqual(word.downloadCodeDataNegative[0].code.codeId);
  expect(comp.downloadCodeTesting[0].code.code).toEqual(word.downloadCodeDataNegative[0].code.code);
}); 

//-----------------------------------send Code data to database-----------------------//
it("SendCode Data CallBack1()", ()=>{
//let codeID=75343893;
  spy=spyOn(service, 'saveCode').and.returnValue(Observable.of(word.sendCodeData));
  //spyFile=spyOn(service, 'uploadFile');

  comp.sendCodeData();
  fixture.detectChanges();
  expect(comp.sendCodeDataComponent.ok).toBe(word.sendCodeData.ok);
  expect(comp.sendCodeDataComponent.n).toBe(word.sendCodeData.n);
}); 

//--------------------Send Code data to database(Complete response is not matching)-----------------------//
  it("SendCode Data CallBack1()", ()=>{
  //let codeID=75343893;
    spy=spyOn(service, 'saveCode').and.returnValue(Observable.of(word.sendCodeData));
    //spyFile=spyOn(service, 'uploadFile');

    comp.sendCodeData();
    fixture.detectChanges();
    expect(comp.sendCodeDataComponent.ok).toBe(word.sendCodeData.ok);
    expect(comp.sendCodeDataComponent.n).toBe(word.sendCodeData.n);
  }); 

  //--------------------Send Code data to database(Complete response is not matching)-----------------------//
  it("SendCode Data CallBack1() (Complete response is not matching)", ()=>{
  //let codeID=75343893;
    spy=spyOn(service, 'saveCode').and.returnValue(Observable.of(word.sendCodeDataNotSame));
    //spyFile=spyOn(service, 'uploadFile');
    comp.sendCodeData();
    fixture.detectChanges();
    expect(comp.sendCodeDataComponent.ok).not.toEqual(word.codeDataNotSame.ok);
    expect(comp.sendCodeDataComponent.n).toBe(word.codeDataNotSame.n);
  }); 

    //--------------------Send Code data to database(undefined)-----------------------//
  it("SendCode Data CallBack1() response is not equal to undefined", ()=>{

    spy=spyOn(service, 'saveCode').and.returnValue(Observable.of(word.sendCodeDataNotSame));
    //spyFile=spyOn(service, 'uploadFile');
    comp.sendCodeData();
    fixture.detectChanges();
    expect(comp.sendCodeDataComponent.ok).not.toEqual(undefined);
    expect(comp.sendCodeDataComponent.n).not.toEqual(undefined);
  
  }); 

     //--------------------Send Code data to database(Response is null)-----------------------//
  it("SendCode Data CallBack1() response is Null", ()=>{

    spy=spyOn(service, 'saveCode').and.returnValue(Observable.of(word.sendCodeDataNotEqual));
    //spyFile=spyOn(service, 'uploadFile');
    comp.sendCodeData();
    fixture.detectChanges();
    expect(comp.sendCodeDataComponent.ok).not.toEqual(word.CodeDataNotEqual.ok);
    expect(comp.sendCodeDataComponent.n).not.toEqual(word.CodeDataNotEqual.n);
  });

// --------------------------retrieve message------------------------------------------------//
    it("Retrieve message test", ()=>{

      spy=spyOn(service, 'retrieveMessage').and.returnValue(Observable.of(word.messageDataComponent));
      //spyFile=spyOn(service, 'uploadFile');
      comp.sendCodeData();
      fixture.detectChanges();
      expect(comp.retreiveMsgDataComponent[0].username).toBe(word.messageDataComponent[0].username);
      expect(comp.retreiveMsgDataComponent[0].message.message).toBe(word.messageDataComponent[0].message.message);
    });

// ------------retrieve message whole of the result is not matching as expected----------------------------//
    it("retrieve message whole of the result is not matching as expected", ()=>{

      spy=spyOn(service, 'retrieveMessage').and.returnValue(Observable.of(word.messageDataComponentNotSame));
      //spyFile=spyOn(service, 'uploadFile');
      comp.sendCodeData();
      fixture.detectChanges();
      expect(comp.retreiveMsgDataComponent[0].username).not.toEqual(word.messageDataComponent[0].username);
      expect(comp.retreiveMsgDataComponent[0].message.message).not.toEqual(word.messageDataComponent[0].message.message);
    });


// ------------retrieve message whole of the result is some matching and some not----------------------------//
    it("retrieve message whole of the result is some matching and some not", ()=>{

      spy=spyOn(service, 'retrieveMessage').and.returnValue(Observable.of(word.messageDataComponentSome));
      //spyFile=spyOn(service, 'uploadFile');
      comp.sendCodeData();
      fixture.detectChanges();
      expect(comp.retreiveMsgDataComponent[0].username).not.toEqual(word.messageDataComponent[0].username);
      expect(comp.retreiveMsgDataComponent[0].message.message).not.toEqual(word.messageDataComponent[0].message.message);
    });

// ------------retrieve message whole of the result and which is not equal to undefined----------------------------//
    it("retrieve message whole of the result is not equal to undefineds", ()=>{

      spy=spyOn(service, 'retrieveMessage').and.returnValue(Observable.of(word.messageDataComponentSome));
      //spyFile=spyOn(service, 'uploadFile');
      comp.sendCodeData();
      fixture.detectChanges();
      expect(comp.retreiveMsgDataComponent[0].username).not.toEqual(undefined);
    });

it("saveMessage successfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponse));
comp.dbmessage.message="https://youtu.be/1DGNn0GslLQ";
comp.message="https://youtu.be/1DGNn0GslLQ";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage successfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponse));
comp.dbmessage.message="http";
comp.message="http";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage successfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponse));
comp.dbmessage.message="hiiiii";
comp.message="hiiiiiiiii";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="https://youtu.be/1DGNn0GslLQ";
comp.message="https://youtu.be/1DGNn0GslLQ";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="https://youtu.be/1DGNn0GslLQ";
comp.message="https://youtu.be/1DGNn0GslLQ";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.n).not.toEqual(undefined);
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegativeAll));
comp.dbmessage.message="https://youtu.be/1DGNn0GslLQ";
comp.message="https://youtu.be/1DGNn0GslLQ";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).not.toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="http";
comp.message="http";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="http";
comp.message="http";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.n).not.toEqual(undefined);
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegativeAll));
comp.dbmessage.message="http";
comp.message="http";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).not.toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
}); 


it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="hiiiii";
comp.message="hiiiii";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
  fixture.detectChanges();
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegative));
comp.dbmessage.message="hiiiii";
comp.message="hiiiii";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.n).not.toEqual(undefined);
}); 

it("saveMessage unsuccessfull", ()=>{
  spy=spyOn(service, 'saveMessage').and.returnValue(Observable.of(word.saveMessageMockResponseNegativeAll));
comp.dbmessage.message="hiiiii";
comp.message="hiiiii";
console.log("this is component dbmessage",comp.dbmessage);
  fixture.detectChanges();
  comp.sendMessage();
  fixture.detectChanges();
  expect(comp.saveMessageTesting.ok).not.toEqual(word.saveMessageData.ok);
  expect(comp.saveMessageTesting.n).not.toEqual(word.saveMessageData.n);
}); 







}); 