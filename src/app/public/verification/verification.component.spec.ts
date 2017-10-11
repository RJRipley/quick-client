import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteMock } from "../../mocks/activated-route.mock";
import { LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { Verification } from './verification.component';


class MockRouter {
  navigateByUrl(url:string) { return url; }
}

class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}


describe('Verification', () => {

  let component:Verification;
  let fixture:ComponentFixture<Verification>;
  let activeRoute:ActivatedRouteMock;

  activeRoute = new ActivatedRouteMock();
  activeRoute.testParams = { email:'test@gmail.com' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verification ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        { provide:ActivatedRoute, useValue:activeRoute },
        { provide:Router, useClass:MockRouter },
        { provide:UserService, useClass:MockUserService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
