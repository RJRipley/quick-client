import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { LoggedInCallback } from "../../services/cognito.service";
import { DynamoDBService } from "../../services/ddb.service";
import { UserService } from "../../services/user.service";
import { Login } from './login.component';


class MockRouter {
  navigateByUrl(url:string) { return url; }
}

class MockDynamoDBService {
  //
}

class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}


describe('Login', () => {

  let component:Login;
  let fixture:ComponentFixture<Login>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        { provide:Router, useClass:MockRouter },
        { provide:DynamoDBService, useClass:MockDynamoDBService },
        { provide:UserService, useClass:MockUserService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
