import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteMock } from "../../mocks/activated-route.mock";
import { UserService } from "../../services/user.service";
import { Confirm } from './confirm.component';

// TODO: [routerLink]

class MockRouter {
  navigateByUrl(url:string) { return url; }
}

class MockUserService {
  //
}


describe('Confirm', () => {

  let component:Confirm;
  let fixture:ComponentFixture<Confirm>;
  let activeRoute:ActivatedRouteMock;

  activeRoute = new ActivatedRouteMock();
  activeRoute.testParams = { email:'test@gmail.com' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm ],
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
    fixture = TestBed.createComponent(Confirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
