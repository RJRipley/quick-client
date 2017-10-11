import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { CognitoCallback, LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { Home } from './home.component';


class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}

describe('Home', () => {

  let component:Home;
  let fixture:ComponentFixture<Home>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, MatButtonModule, MatCardModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule ],
      providers: [
        { provide:UserService, useClass:MockUserService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
