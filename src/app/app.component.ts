import { Component,Input,Output, EventEmitter } from '@angular/core';
import { InputToCountdownDirective } from './directives/input-to-countdown.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   HistoryValuesToWidget:any;
  title = 'timer';
  data:any;
  constructor()
  {
// console.log(this.d.history);
  }

  displayHistory(count) {
    console.log("AppCompoent",count);
    this.HistoryValuesToWidget = count;
  }
}
