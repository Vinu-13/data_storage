import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorywidgetComponent } from './historywidget.component';

describe('HistorywidgetComponent', () => {
  let component: HistorywidgetComponent;
  let fixture: ComponentFixture<HistorywidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorywidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorywidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
