import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { User } from "../../custom/user";


@Component({
  selector:'register',
  templateUrl:'./register.html',
  styleUrls:['register.css']
})
export class Register implements CognitoCallback
{
  @ViewChild('NAME') inputName;
  @ViewChild('EMAIL') inputEmail;
  @ViewChild('PASSWORD') inputPassword;

  errorMessage:string;
  form:FormGroup;
  submitted:boolean;
  
  constructor(private _fb:FormBuilder, private _router:Router, private _userService:UserService) {
    console.log("Register: constructor");
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
      this._router.navigate(['/landing/confirm', result.user.username]);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      name:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });    
  }

  ngAfterViewInit() {
    this.inputName.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let name = this.form.get("name");
    let email = this.form.get("email");
    let password = this.form.get("password");
    if (this.form.valid) {
      let user = new User(name.value, email.value, password.value);
      this.submitted = true;
      this._userService.register(user, this);
    } else {
      // Validation Failed
      if (!name.valid) {
        this.errorMessage = "Invalid Name";
        this.inputName.nativeElement.focus();
      } else if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      } else if (!password.valid) {
        this.errorMessage = "Invalid Password";
        this.inputPassword.nativeElement.focus();
      }
    }
  }
}