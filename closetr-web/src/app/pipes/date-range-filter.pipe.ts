import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatService } from '../services/utils/date-format.service';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {
  dateFormatService: DateFormatService;

  constructor(private dateformatservice: DateFormatService) {
    this.dateFormatService = dateformatservice;
  }

  transform(items: any, dateFrom: Date, dateTo: Date, property: string): any {
    if (!dateFrom || !dateTo) {
      return items;
    }

    let itemCount = 0;
    let filteredItems = {};
    for (let itemID in items) {
      let item = items[itemID];
      let itemDateProperty = this.dateFormatService.formatStringDate(item[property]);
      //comparing item date and criteria
      if (dateFrom <= itemDateProperty && dateTo >= itemDateProperty) {
        filteredItems[itemCount] = item;
        itemCount++;
      }
    }
    return filteredItems;
  }

}
