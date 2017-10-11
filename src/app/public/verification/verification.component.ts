import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'verification',
  templateUrl:'./verification.html',
  styleUrls:['verification.css']
})
export class Verification implements CognitoCallback, OnInit
{
  @ViewChild('CODE') inputCode;
  @ViewChild('PASSWORD') inputPassword;
  
  errorMessage:string;
  form:FormGroup;
  submitted:boolean;
  email:string;

  constructor(private _fb:FormBuilder, private _route:ActivatedRoute, private _router:Router, private _userService:UserService) {
    console.log("Verification:constructor");
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
      this._router.navigate(['/landing/login']);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      code:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      password:['', [Validators.required, Validators.minLength(8)]]
    });
    // Passed in parameter
    this._route.params.subscribe(params => {
      this.email = params['email'];
    }).unsubscribe();
  }

  ngAfterViewInit() {
    this.inputCode.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let code = this.form.get("code");
    let password = this.form.get("password");
    if (this.form.valid) {
      this.submitted = true;
      this._userService.confirmPassword(this.email, code.value, password.value, this);
    } else {
      // Validation Failed
      if (!code.valid) {
        this.errorMessage = "Invalid Code";
        this.inputCode.nativeElement.focus();
      } else if (!password.valid) {
        this.errorMessage = "Invalid Password";
        this.inputPassword.nativeElement.focus();
      }
    }
  }
}