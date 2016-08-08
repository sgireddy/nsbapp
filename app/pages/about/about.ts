import {Component, ChangeDetectorRef} from '@angular/core';
import {NavController, ViewController, Popover} from 'ionic-angular';
import {Schedule, Dialog, Calendar, ToggleButton} from 'primeng/primeng';

@Component({
  templateUrl: 'build/pages/about/about.html',
  directives: [Schedule, Dialog, Calendar, ToggleButton]
})
export class AboutPage {
  conferenceDate = '2047-05-17';
    events: any[];
    data: any;
    checked: boolean;
    dialogVisible: boolean = false;
    calendarHeight: number = 500;
    header: Object;


    headerConfig = {
        left:   'Hello World',
        center: 'Your Calendar',
        right:  'today prev,next'
    };

  constructor(private nav: NavController,
                //private schedule: Schedule,
            private _cd: ChangeDetectorRef) {

      this.events = [
            {
                'title': 'All Day Event',
                'start': '2016-06-19'
            },
            {
                'title': 'Long Event',
                'start': '2016-06-18',
                'end': '2016-06-20'
            },
            {
                'title': 'Repeating Event',
                'start': '2016-06-19T20:00:00'
            },
            {
                'title': 'Repeating Event',
                'start': '2016-06-19T18:00:00'
            },
            {
                'title': 'Conference',
                'start': '2016-06-19',
                'end': '2016-06-20'
            }
        ];
    console.log(this.events);
  }
    onPageWillEnter() {
      console.log('in schedule');
       this.header = {
            left: 'prev,next, today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

//   ngOnInit() {
//   }
  handleDayClick(event) {
        console.dir('handled click');
        this.dialogVisible = true;
        this._cd.detectChanges();
    }

  sayHello() {
      console.log('Hello');
  }
fetchEvents(eventData) {
    console.log('fetchEvents:', eventData.view, eventData.element);
}
}
