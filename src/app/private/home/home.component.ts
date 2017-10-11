import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CognitoCallback, LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'home',
  templateUrl:'./home.html',
  styleUrls:['home.css']
})
export class Home implements CognitoCallback, LoggedInCallback
{
  email:string;
  name:string;
  initials:string;

  constructor(private _router:Router, private _userService:UserService) {
    console.log("Home: constructor");
    this.initials = "XX";
    this._userService.isAuthenticated(this);
  }
  
  cognitoCallback(message:string, result:any) {
    if (message != null) {
      // Error
    } else {
      // Map results
      for (let i = 0; i < result.length; i++) {
        let name = result[i].getName();
        let value = result[i].getValue();
        if (name == 'email') {
          this.email = value;
        } else if (name == 'nickname') {
          this.name = value;
        }
      }

      // Get initials
      let names = this.name.split(' ');
      if (names.length == 0) {
        this.initials = '??'
      } else if (names.length == 1) {
        this.initials = names[0].substr(0, 2);
      } else {
        let initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
        this.initials = initials;
      }
    }
  }  

  isLoggedIn(message:string, isLoggedIn:boolean) {
    if (isLoggedIn) {
      this._userService.getParameters(this);
    } else {
      this._router.navigate(['/landing/login']);
    }
  }

  onLogout() {
    this._router.navigate(['/home/logout']);
  }

  onChangePassword() {
    console.log("TODO: Change Password");
  }
}