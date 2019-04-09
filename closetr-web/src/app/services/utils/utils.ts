import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

export const httpHandlerDefault = (apiCall: any) => {
  return apiCall.pipe(map(
    (data: any) => data,
    error => { console.log(error) }
  ));
}

export const httpHandlerPipeMap = (
  apiCall: any,
  object: any
) => {
  console.log(method);
  return apiCall
    .pipe(map(
      (data: any) => {
        console.log(data);
        let resultList = data.data;
        console.log(resultList.map((result) => new object(result)));
        return resultList.map((result) => new object(result));
      },
      error => { console.log(error) }
  ));
}

export const httpParams = (object) => new HttpParams({
  fromObject: object
});
