import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";


@Component({
  selector:'confirm',
  templateUrl:'./confirm.html',
  styleUrls:['confirm.css']
})
export class Confirm implements OnInit, CognitoCallback
{
  @ViewChild('CODE') inputCode;
  @ViewChild('EMAIL') inputEmail;
  
  errorMessage:string;
  form:FormGroup;
  submitted:boolean;

  constructor(private _fb:FormBuilder, private _route:ActivatedRoute, private _router:Router, private _userService:UserService) {
    console.log("Confirm: constructor");
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
      code:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
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
    if (this.form.valid) {
      this.submitted = true;
      this._userService.confirmRegistration(email.value, code.value, this);
    } else {
      // Validation Failed
      if (!email.valid) {
        this.errorMessage = "Invalid Email Address";
        this.inputEmail.nativeElement.focus();
      } else if (!code.valid) {
        this.errorMessage = "Invalid Code";
        this.inputCode.nativeElement.focus();
      }
    }
  }
}
