import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggedInCallback } from "../../services/cognito.service";
import { UserService } from "../../services/user.service";
import { Logout } from './logout.component';


class MockUserService {
  isAuthenticated(callback:LoggedInCallback) {
    return;
  }
}


describe('Logout', () => {

  let component:Logout;
  let fixture:ComponentFixture<Logout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Logout ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide:UserService, useClass:MockUserService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
