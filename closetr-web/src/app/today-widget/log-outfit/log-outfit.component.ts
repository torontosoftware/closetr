import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {

  constructor() {
    console.log("henlo");
  }

  ngOnInit() {
  }

}
