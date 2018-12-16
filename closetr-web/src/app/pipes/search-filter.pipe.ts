import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, searchText: String, property: string): any {
    if (!searchText || searchText == '') {
      return items;
    }

    var itemCount = 0;
    var filteredItems = {};
    for (let itemID in items) {
      var item = items[itemID];
      var itemProperty = item[property].toLowerCase();
      var searchProperty = searchText.toLowerCase();
      if (itemProperty.includes(searchProperty)) {
        filteredItems[itemCount] = item;
        itemCount++;
      }
    }
    return filteredItems;
  }

}
