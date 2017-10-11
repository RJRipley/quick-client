import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CognitoCallback, CognitoService, LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


export class Credentials {
  public accessToken:string;
  public idToken:string;
}


@Component({
  selector:'view',
  templateUrl:'./view.html',
  styleUrls:['view.css']
})
export class View implements CognitoCallback, LoggedInCallback
{
  // public parameters:Array<Parameters> = [];
  public cognitoId:String;
  public credentials:Credentials;

  text:string;
  lang:string;
  file:any;
  data:any;
  score:0;

  constructor(public _cognitoService:CognitoService, public _router:Router, public _userService:UserService) {
    console.log("View: constructor");
    this.credentials = new Credentials();
    this.data = { 'key':'', 'signature':'' };
    this.lang = 'en';
    this._userService.isAuthenticated(this);
  }

  cognitoCallback(message:string, result:any) {
    if (message != null) {
    } else {
      this.credentials.idToken = result;
    }
  }

  isLoggedIn(message:string, isLoggedIn:boolean) {
    if (isLoggedIn) {
      this._cognitoService.getIdToken(this);
    } else {
      this._router.navigate(['/landing/login']);
    }
  }
}