import { Directive } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
  selector: '[appInputToCountdown]'
})
export class InputToCountdownDirective {
history:any[]=[];

  // 1.1 
  private state = new BehaviorSubject({
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalTime: 0
  });  
  public obs$ = this.state.asObservable();
  // End 1.1 

  private intervalState = new BehaviorSubject({
    min: 0,
    max: 0
  });
  public intervalObs$ = this.intervalState.asObservable();
  hsecond: number;
  hhour:number;
  hminute:number;
  obj = new Object();
 

  // 1.2
  updateState(value, command) {
    let valToNumber = parseInt(value);
    if (valToNumber < 0) valToNumber = 0;
    let update = this.state.value;
    if (command === 'seconds') 
    {
      update.seconds = valToNumber;
      this.hsecond=valToNumber;
      this.obj['mysecond'] = this.hsecond;
      this.history.push(this.obj);
    //  console.log("Seconds",this.history);

    }
   
    if (command === 'minutes')
    {
      update.minutes = valToNumber;
      this.hminute=valToNumber;
      this.obj['myminutes'] = this.hminute;
      this.history.push(this.obj);
     // console.log('obj',this.obj2)
      
    }
    if (command === 'hours')
    {
      update.hours = valToNumber;
      this.hhour=valToNumber;
      this.obj['myhour'] = this.hhour;
      this.history.push(this.obj);
      console.log('obj',this.obj);
    }
    update.totalTime = this.calculateSeconds(update);
    this.state.next(update);
  }
  // End 1.2

  updateIntervalState(value, command) {
    let valToNumber = parseInt(value);
    if (valToNumber < 0) valToNumber = 0;
    let update = this.intervalState.value;
    if (command === 'min') update.min = valToNumber;
    if (command === 'max') update.max = valToNumber;
    this.intervalState.next(update);
  }
  
  // 1.3
  calculateSeconds(update) {
    let totalTime = update.seconds
    totalTime += update.minutes * 60;
    totalTime += (update.hours * 60) * 60;
    return totalTime;
  }
  // End 1.3

  constructor() {}
  
  getSeconds() {
    return this.state.value.seconds;
  }

  getMinutes() {
    return this.state.value.minutes;
  }

  getHours() {
    return this.state.value.hours;
  }

  getTotalSeconds() {
    return this.state.value.totalTime;
  }


  getMin() {
    return this.intervalState.value.min;
  }

  getMax() {
    return this.intervalState.value.max;
  }

}
