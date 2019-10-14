import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ContentfulService } from 'src/app/services/contentful.service';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';
import { SynthesisService } from 'src/app/services/synthesis.service';

@Component({
  selector: 'app-drill',
  templateUrl: './drill.component.html',
  styleUrls: ['./drill.component.css']
})
export class DrillComponent implements OnInit {
  @ViewChild('drillSelect', { static: true })
  drillSelect: ElementRef;
  drills$;
  techniques = [];
  selectedDrill$ = new Subject();
  selectedDrillObs$;
  constructor(private c: ContentfulService,public d: InputToCountdownDirective, private s: SynthesisService) { }

  ngOnInit() {
    this.drills$ = this.c.getDrills().pipe(tap(val => this.selectedDrill$.next(val[0])));
    this.selectedDrillObs$ = this.selectedDrill$.asObservable().pipe(map(val => {
      const drill = this.c.getSelectedDrill(val);
      this.techniques = drill.techniques;
      return drill;
    }))
   
  }

  drillChanged(value) {
    console.log("Selected Drills",value);
    this.selectedDrill$.next(value);
  }
}
