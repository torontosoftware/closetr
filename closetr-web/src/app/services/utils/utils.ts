import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Clothing } from '../../models/clothing.model';

export const httpHandlerDefault = (apiCall: any) => {
  return apiCall.pipe(map(
    (data: any) => data,
    error => { console.log(error) }
  ));
}

export const httpHandlerPipeMapClothing = (apiCall: any) => {
  return apiCall
    .pipe(map(
      (data: any) => {
        let resultList = data.data;
        return resultList.map((result) => new Clothing(result));
      },
      error => { console.log(error) }
  ));
}

export const httpParams = (object) => new HttpParams({
  fromObject: object
});
