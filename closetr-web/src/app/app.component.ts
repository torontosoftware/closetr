import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})

export class AppComponent {
  title = 'closeter';

  constructor(private router: Router ) {
    router = router;
  }
}
