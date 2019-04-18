import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  animations: [fadeAnimation],
})

export class AppComponent{
  title: string = 'Closetr';

  constructor(private router: Router) { }
}
