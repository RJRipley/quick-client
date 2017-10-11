import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { CognitoCallback, LoggedInCallback } from "../../services/cognito.service";
import { DynamoDBService } from "../../services/ddb.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'login',
  templateUrl:'./login.html',
  styleUrls:['login.css']
})
export class Login implements AfterViewInit, CognitoCallback, LoggedInCallback, OnInit
{
  @ViewChild('EMAIL') inputEmail;
  @ViewChild('PASSWORD') inputPassword;
  
  errorMessage:string;
  form:FormGroup;
  submitted:boolean;

  constructor(private _ddb:DynamoDBService, private _fb:FormBuilder, private _router:Router, private _userService:UserService) {
    console.log("Login: constructor");
    this.errorMessage = "";
    this.submitted = false;
  }

  cognitoCallback(message:string, result:any) {
    this.submitted = false;
    if (message != null) {
      // Error
      console.log("result: " + message);
      if (message === 'User does not exist.') {
        this.errorMessage = 'User not found.  Click Register to create';
      } else if (message === 'User is not confirmed.') {
        this.errorMessage = message;
        let email = this.form.get("email");
        this._router.navigate(['/landing/confirm/' + email.value]);
      } else if (message === 'User needs to set password.') {
        this.errorMessage = message;
        let email = this.form.get("email");
        this._router.navigate(['/landing/changePassword/' + email.value]);
      } else if (message === 'Incorrect username or password.') {
        this.errorMessage = message;
      }
    } else {
      // Success
      this._ddb.writeLogEntry("login");
      this._router.navigate(['/home']);
    }
  }

  isLoggedIn(message:string, isLoggedIn:boolean) {
    if (isLoggedIn) {
      this._router.navigate(['/home']);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });    
    // Check if user is already authenticated
    this._userService.isAuthenticated(this);
  }

  ngAfterViewInit() {
    this.inputEmail.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let email = this.form.get("email");
    let password = this.form.get("password");
    if (this.form.valid) {
      this.submitted = true;
      this._userService.authenticate(email.value, password.value, this);
    } else {
      // Validation Failed
      if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      } else if (!password.valid) {
        this.errorMessage = "Invalid Password";
        this.inputPassword.nativeElement.focus();
      }
    }
  }
}