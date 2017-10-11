import { Component } from '@angular/core';


@Component({
  selector:'landing',
  templateUrl:'./landing.html',
  styleUrls:['./landing.css']
})
export class Landing
{
  constructor() {
    console.log("Landing: constructor");
  }
}
