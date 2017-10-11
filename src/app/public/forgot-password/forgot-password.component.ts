import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'forgot-password',
  templateUrl:'./forgot-password.html',
  styleUrls:['forgot-password.css']
})
export class ForgotPassword implements CognitoCallback
{
  @ViewChild('EMAIL') inputEmail;

  errorMessage:string;
  form:FormGroup;
  submitted:boolean;

  constructor(private _fb:FormBuilder, private _router:Router, private _userService:UserService) {
    console.log("ForgotPassword: constructor");
    this.errorMessage = "";
    this.submitted = false;
  }

  cognitoCallback(message:string, result:any) {
    this.submitted = false;
    if (message != null) {
      // Error
      console.log("result: " + message);
      this.errorMessage = message;
    } else {
      // Success
      let email = this.form.get("email");
      this._router.navigate(['/landing/verification', email.value]);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      email:['', [Validators.required, Validators.email]]
    });    
  }

  ngAfterViewInit() {
    this.inputEmail.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let email = this.form.get("email");
    if (this.form.valid) {
      this.submitted = true;
      this._userService.forgotPassword(email.value, this);
    } else {
      // Validation Failed
      if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      }
    }
  }
}
