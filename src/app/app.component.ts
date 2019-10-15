import { Component } from '@angular/core';
import { InputToCountdownDirective } from './directives/input-to-countdown.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timer';
  data:any;
  constructor()
  {
// console.log(this.d.history);
  }
}
