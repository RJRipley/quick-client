import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { User } from "../../custom/user";


@Component({
  selector:'change-password',
  templateUrl:'./change-password.html',
  styleUrls:['change-password.css']
})
export class ChangePassword implements AfterViewInit, CognitoCallback, OnInit
{
  @ViewChild('EMAIL') inputEmail;
  @ViewChild('CODE') inputCode;
  @ViewChild('PASSWORD') inputPassword;

  errorMessage:string;
  form:FormGroup;
  submitted:boolean;

  constructor(private _fb:FormBuilder, private _route:ActivatedRoute, private _router:Router, private _userService:UserService) {
    console.log("SetPassword: constructor");
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
      this._router.navigate(['/home']);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      code:['', [Validators.required, Validators.minLength(8)]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });    
    // Passed in parameter
    this._route.params.subscribe(params => {
      this.form.patchValue({ email:params['email'] });
    }).unsubscribe();
  }

  ngAfterViewInit() {
    this.inputCode.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let email = this.form.get("email");
    let code = this.form.get("code");
    let password = this.form.get("password");
    if (this.form.valid) {
      let user = new User("", email.value, password.value, code.value);
      console.log(user);
      this.submitted = true;
      this._userService.changePassword(user, this);
    } else {
      // Validation Failed
      if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      } else if (!code.valid) {
        this.errorMessage = "Invalid Code";
        this.inputCode.nativeElement.focus();
      } else if (!password.valid) {
        this.errorMessage = "Invalid Password";
        this.inputPassword.nativeElement.focus();
      }
    }
  }
}
