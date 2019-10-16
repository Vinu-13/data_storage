import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { InputToCountdownDirective } from './directives/input-to-countdown.directive';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DrillComponent } from './components/drill/drill.component';
import { HistorywidgetComponent } from './components/historywidget/historywidget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TimeInputComponent,
    CountdownComponent,
    InputToCountdownDirective,
    TimeFormatPipe,
    DrillComponent,
    HistorywidgetComponent
  
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
