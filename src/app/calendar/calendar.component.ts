import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Projet } from '../model/Projet';
import { ProjetServiceService } from '../service/projet-service.service';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { jwtDecode } from "jwt-decode";

// Define the CalendarDay class
export class CalendarDay {
  public date: Date;
  public title: String;
  public isPastDate: boolean;
  public isToday: boolean;
  public projects: Projet[]; // Add the projects property
  public color: string; // Add color property
  public getDateString() {
    return this.date.toISOString().split("T")[0]
  }

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    this.color = ''; // Initialize color property
  }

}

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  projets: Projet[];
  u: User;
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string;
  private monthIndex: number = 0;

  constructor(private ps: ProjetServiceService, private us: UserServiceService) { }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        console.log(data);
        this.u = data;
        this.getuprojets(); // Call the method here after user data is retrieved
        
      }
    );
  }

  getuprojets() {
    if (this.isChefProjet()) {
      this.ps.getprojetsbycdp(this.u.id).subscribe(
        data => {
          console.log(data);
          this.projets = data;
          this.assignProjectsToCalendar();
        }
      )
    } else if (this.isResponsable() || this.isSuperadmin()) {
      this.ps.getprojets().subscribe(
        data => {
          console.log(data);
          this.projets = data;
          this.assignProjectsToCalendar();
        }
      )
    } else if (this.isDeveloppeur()) {
      this.ps.getprojetsbydev(this.u.id).subscribe(
        data => {
          console.log(data);
          this.projets = data;
          this.assignProjectsToCalendar();
        }
      )
    }
  }
  assignProjectsToCalendar() {
    console.log("Projects for Calendar:", this.projets); // Log filtered projects
    this.calendar.forEach(day => {
      const projectsForDay = this.projets.filter(proj => this.isProjectInRange(proj, day.date));
      if (projectsForDay.length > 0) {
        day.color = projectsForDay[0].color; // Assign the color of the first project to the day
        day.title = projectsForDay[0].nom_projet; // Assign the name of the first project to the day title
      }
    });
  }
  
  
  populateCalendarWithProjects() {
    if (this.calendar.length > 0 && this.projets.length > 0) {
      this.calendar.forEach(day => {
        day.projects = this.projets.filter(proj => {
          const isInRange = this.isProjectInRange(proj, day.date);
          console.log(`Project ${proj.nom_projet} is in range for ${day.date}: ${isInRange}`);
          return isInRange;
        });
      });
    }
  }


  isSuperadmin(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_SUPERADMIN";
  }

  isChefProjet(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_CHEF_DE_PROJET";
  }

  isResponsable(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_RESPONSABLE";
  }

  isDeveloppeur(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_RESPONSABLE";
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
    this.assignProjectsToCalendar();
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
    this.assignProjectsToCalendar();
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  isProjectInRange(projet: Projet, date: Date): boolean {
    const startDate = new Date(projet.startDate);
    const endDate = new Date(projet.endDate);
    const targetDate = new Date(date);
    return targetDate >= startDate && targetDate <= endDate;
  }
  
  
}
