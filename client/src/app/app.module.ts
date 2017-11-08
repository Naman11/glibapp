  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { SocketService } from './socket.service';
  import { HttpService } from './http.service';
  import { ChatService } from './chat.service';
  import {WelcomeComponent} from './welcome/welcome.component';
  import { GeneralComponent } from './dashboard/general/general.component';
  import {VideoCallComponent} from './dashboard/chats/video-call/video-call.component'; 
  import { appRouting } from './app.routing'; 
  import { AppComponent } from './app.component';
  import { HomeComponent } from './home/home.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './register/register.component';
  import  {MailverificationComponent} from './mailverification/mailverification.component';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ChatsComponent } from './dashboard/chats/chats.component';
  import {GetInfoService} from './shared/get-info.service';
  import { NotFoundComponent } from './not-found/not-found.component';
  import { RegisterService} from './shared/register.service';
  import { MailotpService} from './shared/mailotp.service';
  import { YoutubePlayerModule } from 'ng2-youtube-player';
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { ForgetPassComponent} from './forget-pass/forget-pass.component';
  import { SetPasswordComponent} from './set-password/set-password.component'; 
  import { AccountSettingsComponent } from './dashboard/account-settings/account-settings.component';
  import { FileTransferGlobalService } from './shared/file-transfer-global.service'
  import { AvatarModule } from "ng2-avatar";
  import { EqualValidator } from './register/password.match.directive';

  @NgModule({
    declarations: [
    AppComponent,
    RegisterComponent,
    MailverificationComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent,
    GeneralComponent,
    ChatsComponent,
    VideoCallComponent,
    WelcomeComponent,
    AccountSettingsComponent,
    ForgetPassComponent,
    SetPasswordComponent,
    EqualValidator
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,

    YoutubePlayerModule,
    AvatarModule
    ],
   providers: [
    RegisterService,
    MailotpService,
    SocketService,
    HttpService,
    ChatService,
    GetInfoService,
    FileTransferGlobalService
     ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  platformBrowserDynamic().bootstrapModule(AppModule);