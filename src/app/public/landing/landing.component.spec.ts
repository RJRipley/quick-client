import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Landing } from './landing.component';


describe('Landing', () => {

  let component:Landing;
  let fixture:ComponentFixture<Landing>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Landing ],
      imports: [ RouterTestingModule ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
