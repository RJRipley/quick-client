import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { ForgotPassword } from './forgot-password.component';


class MockRouter {
  navigateByUrl(url:string) { return url; }
}

class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}


describe('ForgotPassword', () => {

  let component:ForgotPassword;
  let fixture:ComponentFixture<ForgotPassword>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassword ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        { provide:Router, useClass:MockRouter },
        { provide:UserService, useClass:MockUserService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
