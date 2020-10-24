import { Component } from '@angular/core';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  theme = true;
  dateFormat = 'yyyy/MM/dd';
  date: Date = null;

  constructor(private dateService: DateService) {}

  get isTheme() {
    return this.theme ? 'dark' : 'light';
  }

  setDate(date: Date): void {
    this.dateService.setDay(date);
  }
}
