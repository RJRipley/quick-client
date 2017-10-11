import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'resend',
  templateUrl:'./resend.html',
  styleUrls:['resend.css']
})
export class Resend implements AfterViewInit, CognitoCallback, OnInit
{
  @ViewChild('EMAIL') inputEmail;

  errorMessage:string;
  form:FormGroup;
  submitted:boolean;

  constructor(private _fb:FormBuilder, private _route:ActivatedRoute, private _router:Router, private _userService:UserService) {
    console.log("Resend: constructor");
    this.errorMessage = "";
    this.submitted = false;
  }

  cognitoCallback(message:any, result:any) {
    this.submitted = false;
    if (message != null) {
      // Error
      console.log("result: " + message);
      if (message === 'User is already confirmed.') {
        this.errorMessage = message;
        this._router.navigate(['/landing']);
      }
    } else {
      // Success
      let email = this.form.get("email");
      this._router.navigate(['/landing/confirm', email.value]);
    }
  }

  ngOnInit() {
    // Reactive Form
    this.form = this._fb.group({
      email:['', [Validators.required, Validators.email]]
    });
    // Passed in parameter
    this._route.params.subscribe(params => {
      this.form.patchValue({ email:params['email'] });
    }).unsubscribe();
  }

  ngAfterViewInit() {
    this.inputEmail.nativeElement.focus();
  }

  onSubmit() {
    this.errorMessage = "";
    let email = this.form.get("email");
    if (this.form.valid) {
      this.submitted = true;
      this._userService.resendCode(email.value, this);
    } else {
      // Validation Failed
      if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      }
    }
  }
}