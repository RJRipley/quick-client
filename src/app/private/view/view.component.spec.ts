import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CognitoService, LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { View } from './view.component';


class MockCognitoService {
  //
}

class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}


describe('View', () => {

  let component:View;
  let fixture:ComponentFixture<View>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ View ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide:CognitoService, useClass:MockCognitoService },
        { provide:UserService, useClass:MockUserService }
      ],
      schemas: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(View);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
