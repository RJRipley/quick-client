import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MATERIAL_SANITY_CHECKS } from '@angular/material';

import { App } from './app.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ App ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide:MATERIAL_SANITY_CHECKS, useValue:false }
      ],
      schemas: []
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
