import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Register } from './register.component';


class MockRouter {
  navigateByUrl(url:string) { return url; }
}

class MockUserService {
  //
}


describe('Register', () => {

  let component:Register;
  let fixture:ComponentFixture<Register>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register ],
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
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
