import { Component } from '@angular/core';
import * as jalaliMoment from 'jalali-moment';

@Component({
  selector: 'ali-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  daysSelected: any[] = [];
  event: any;
  selectStartDate;

  isSelected = (event: any) => {
    const dateValue = event.toDate();
    const date =
      dateValue.getFullYear() +
      '-' +
      ('00' + (dateValue.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + dateValue.getDate()).slice(-2);
    return this.daysSelected.find(
      (x) => x == jalaliMoment(date).format('jYYYY-jMM-jDD')
    )
      ? 'selected'
      : null;
  };

  select(event: any, calendar: any) {
    const dateValue = event.toDate();
    const date =
      dateValue.getFullYear() +
      '-' +
      ('00' + (dateValue.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + dateValue.getDate()).slice(-2);
    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) {
      this.daysSelected.push(jalaliMoment(date).format('jYYYY-jMM-jDD'));
    } else {
      this.daysSelected.splice(index, 1);
    }
    calendar.updateTodaysDate();
  }
}
