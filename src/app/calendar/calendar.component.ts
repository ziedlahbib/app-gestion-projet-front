import { Component, OnInit } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth', // Set the initial view
  //   events: [
  //     // Define your events here
  //   ]
  // };
  constructor() { }

  ngOnInit(): void {
  }

}
