import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
export class App {
  constructor() {
    console.log("App: constructor");
  }
}
