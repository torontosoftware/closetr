import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(items: any, dateFrom: Date, dateTo: Date, property: string): any {
    if (!dateFrom || !dateTo) {
      return items;
    }

    let itemCount = 0;
    let filteredItems = {};
    for (let itemID in items) {
      let item = items[itemID];
      let itemDateProperty = this.formatStringDate(item[property]);
      //comparing item date and criteria
      if (dateFrom <= itemDateProperty && dateTo >= itemDateProperty) {
        filteredItems[itemCount] = item;
        itemCount++;
      }
    }
    return filteredItems;
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

}
