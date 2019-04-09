import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Clothing } from '../models/clothing.model';

@Injectable({
  providedIn: 'root'
})

export class LogOutfitService {
  baseUrl = `${environment.baseUrl}/outfitEntries/entry/`;
  constructor(private http: HttpClient) { }

  /*
  Input: Outfit Entry object (generic for now)
  Adds the outfit entry into the list of entries for this user.
  Parameters include userID, date, and clothingID.
  */
  addOutfitClothing(params: any): any {
    console.log(`${this.baseUrl}`);
    return this.genericHandler(this.http.post(`${this.baseUrl}`, params));
  }

  /*
  Input: outfitEntryID
  Deletes outfit entry from the list of entries for
  the id.
  */
  deleteOutfitClothing(outfitEntryID: any): any {
    return this.genericHandler(this.http.delete(`${this.baseUrl}${outfitEntryID}`));
  }

  /*
  Input: criteria, including date, userID.
  Returns list of outfit entries for the given date
  and userID. Returns all outfit entries if no
  criteria provided.
  */
  getAllOutfitClothes(criteria: any): any {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get<any>(`${this.baseUrl}`, {params})
      .pipe(map(
        (data: any) => {
          let outfitEntryList = data.data;
          return outfitEntryList.map((clothing) => new Clothing(clothing));
        },
        error => { console.log(error) }
    ));
  }

  genericHandler = (apiCall: any) => {
    return apiCall.pipe(map(
      (data: any) => data,
      error => { console.log(error) }
    ));
  }

}
