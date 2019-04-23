import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, searchText: String, property: string): any {
    if (!searchText || searchText == '') {
      return items;
    }

    let itemCount = 0, filteredItems = {};
    for (let itemID in items) {
      let item = items[itemID];
      let itemProperty = item[property].toLowerCase();
      let searchProperty = searchText.toLowerCase();
      if (itemProperty.startsWith(searchProperty)) {
        filteredItems[itemCount] = item;
        itemCount++;
      }
    }
    return filteredItems;
  }

}
