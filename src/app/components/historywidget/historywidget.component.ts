import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-historywidget',
  templateUrl: './historywidget.component.html',
  styleUrls: ['./historywidget.component.css']
})
export class HistorywidgetComponent implements OnInit {
  @Input() HistoryvaluesfromApp :any;
  constructor() { }

  ngOnInit() {
  // console.log("child",this.history);
  }
}
