import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { MatButtonModule, MatCardModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

// Routes
import { AppRoutingModule } from "./app.routes";

// Public
import { App } from './app.component';
import { ChangePassword } from './public/change-password/change-password.component';
import { Confirm } from './public/confirm/confirm.component';
import { ForgotPassword } from './public/forgot-password/forgot-password.component';
import { Landing } from './public/landing/landing.component';
import { Login } from './public/login/login.component';
import { Register } from './public/register/register.component';
import { Resend } from './public/resend/resend.component';
import { Verification } from "./public/verification/verification.component";

// Private
import { Home } from './private/home/home.component';
import { Logout } from './private/logout/logout.component';
import { View } from "./private/view/view.component";

// Services
import { CognitoService } from "./services/cognito.service";
import { DynamoDBService } from "./services/ddb.service";
import { UserService } from "./services/user.service";


@NgModule({
  imports: [
    AppRoutingModule,    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    App,
    ChangePassword,
    Confirm,
    ForgotPassword,
    Landing,
    Login,
    Logout,
    Register,
    Resend,
    Verification,
    Home,
    View
  ],
  providers: [
    CognitoService,
    DynamoDBService,
    UserService
  ],
  bootstrap: [App]
})
export class AppModule { }
