import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swap-shifts';

  // for deploy the site in github 
  // ng build --output-path docs --base-href /swap-shift/
}
