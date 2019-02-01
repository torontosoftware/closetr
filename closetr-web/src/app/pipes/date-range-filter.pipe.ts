import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(items: any, dateFrom: Date, dateTo: Date, property): any {
    if (!dateFrom || !dateTo) {
      return items;
    }

    let itemCount = 0;
    let filteredItems = {};
    for (let itemID in items) {
      let item = items[itemID];
      let itemDateProperty = item[property];
      //comparing item date and criteria
      if (dateFrom <= itemDateProperty && dateTo >= itemDateProperty) {
        filteredItems[itemCount] = item;
        itemCount++;
      }
    }
    console.log(filteredItems);
    return filteredItems;
  }

}
