import { AfterViewInit, Component, ElementRef, OnInit, ViewChild ,Input,Output, EventEmitter} from '@angular/core';
import { fromEvent, interval, merge, of, range, BehaviorSubject, Subject } from 'rxjs';
import { mapTo, scan, switchMap, takeUntil, concatMap, delay, mergeMap, tap, skipWhile, map } from 'rxjs/operators';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';
import { SynthesisService } from 'src/app/services/synthesis.service';
import { ContentfulService } from 'src/app/services/contentful.service';
import {Time} from '../../common/models/time.models';
import {DrillComponent} from '../drill/drill.component';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, AfterViewInit {

  faPlay = faPlay;
  faPause = faPause;
  faSquare = faSquare;
  history  = new Array();
  
  @ViewChild('start', { static: true })
  startBtn: ElementRef;

  @ViewChild('pause', { static: true })
  pauseBtn: ElementRef;

  @ViewChild('reset', { static: true })
  resetBtn: ElementRef;
  @Output() HistoryValues = new EventEmitter();

  // @ViewChild('drillSelect', { static: true })
  // drillSelect: ElementRef;

  drills$;
   techniques = [];

  selectedDrill$ = new Subject();
  selectedDrillObs$;

  intervalObs$;
  max = 0;
  min = 0;
 

  constructor(public d: InputToCountdownDirective, private s: SynthesisService , private c: ContentfulService) { }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    // 3.1
    this.s.updateMessage('hello');
    const start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(true));
    start$.subscribe(x => {
      if(x === true){
        let newTime  = new Time();
        newTime.hours = this.d.getHours();
        newTime.minutes = this.d.getMinutes();
        newTime.seconds = this.d.getSeconds();
        newTime.content = this.c.getDrillContect();
        this.history.push(newTime);
        this.HistoryValues.emit(this.history);
      }
     
    } 
  );
    const pause$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(mapTo(false));
    const reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo(null));
    const zero$ = new Subject();
    const stateChange$ = this.d.obs$.pipe(mapTo(null));
    this.intervalObs$ = merge(start$, pause$, reset$, stateChange$, zero$).pipe(
      switchMap(isCounting => {
        
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000) : of();
      }),
      scan((accumulatedValue, currentValue) => {
        if (accumulatedValue === 0 && currentValue !== null) {
          console.log("History",this.history)
          zero$.next(null);
          return accumulatedValue;
        }
        if (currentValue === null || !accumulatedValue) return this.d.getTotalSeconds();
        return --accumulatedValue;
      })
    );
    // End 3.1

    this.d.intervalObs$.subscribe(val => {
      // console.log("Val",val)
      this.max = val.max;
      this.min = val.min;
    }); // TODO: Don't do this, Brain is alseep.


    merge(start$, pause$, reset$, zero$).pipe(
      switchMap(isCounting => {
        const random = () => {
          // console.log(this.min);
          // console.log(this.max);

          const value = (this.min * 1000) + (Math.floor((Math.random() * (this.max + 1 - this.min))) * 1000)
          // console.log(value);
          return value;
        };
        if (isCounting === null) return of(null);
        return isCounting ? interval(1000).pipe(
          concatMap(val => {
            return of(val).pipe(delay(random()), tap(val => {
              const arrayLength = this.techniques.length;
              const randValue = Math.floor((Math.random() * arrayLength))
              // const message = this.techniques[randValue];
              
              // this.s.updateMessage(message);
              // this.s.speak();
            }));
          })
        ) : of();
      }),
    ).subscribe(console.log) // TODO: Don't do this either, async pipe later or something cute
  }

  // drillChanged(value) {
  //   this.selectedDrill$.next(value);
  // }
}
