import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateRangeFilter'})
export class DateRangeFilterPipeMock implements PipeTransform {
  transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
   return items;
  }
}


@Pipe({name: 'filter'})
export class SearchFilterPipeMock implements PipeTransform{
  transform(items: any, searchText: String, property: string) {
    if (searchText == 'shirt') {
      return [items[0]];
    }
    return items;
  }
}
