import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  /*
  format date to string
  */
  formatDateString(date: Date): string {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /*
  format string to date, from ISO format.
  */
  formatStringDate(date: string): Date {
    var year = parseInt(date.substring(0,4));
    var month = parseInt(date.substring(5,7)) - 1;
    var day = parseInt(date.substring(8,10));
    return (new Date(year, month, day));
  }

  /*
  date range for calculator (to). Calculates from
  date based on dateRangeFor.
  */
  dateRangeForFrom(dateRangeFor): Date {
    let today = new Date();
    switch (dateRangeFor) {
        case 'last week':
        console.log('last week');
        return new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
      case 'last two weeks':
      console.log('last  2 week');
        return new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 14
        );
      case 'last month':
        console.log('last month');
        console.log(
          new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate()
          )
        );
        return new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
      case 'last 6 months':
        console.log('last 6 months');
        return new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
      case 'last year':
        console.log('last year');
        return new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
    }
  }

}
