import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'logout',
  template:''
})
export class Logout implements LoggedInCallback
{
  constructor(private _router:Router, private _userService:UserService) {
    console.log("Logout: constructor");
    this._userService.isAuthenticated(this)
  }

  isLoggedIn(message:string, isLoggedIn:boolean) {
    if (isLoggedIn) {
      this._userService.logout();
      this._router.navigate(['/landing']);
    }

    this._router.navigate(['/landing']);
  }
}
