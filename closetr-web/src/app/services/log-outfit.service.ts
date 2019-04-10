import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Clothing } from '../models/clothing.model';
import {
  httpPostHandlerDefault,
  httpDeleteHandlerDefault,
  httpHandlerPipeMapClothing,
  httpParams
} from './utils/utils';

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
  addOutfitClothing = (params: any): any =>
     httpPostHandlerDefault(this, `${this.baseUrl}`, params);

  /*
  Input: outfitEntryID
  Deletes outfit entry from the list of entries for
  the id.
  */
  deleteOutfitClothing = (outfitEntryID: any): any =>
    httpDeleteHandlerDefault(this, `${this.baseUrl}${outfitEntryID}`);

  /*
  Input: criteria, including date, userID.
  Returns list of outfit entries for the given date
  and userID. Returns all outfit entries if no
  criteria provided.
  */
  getAllOutfitClothes = (criteria: any): any => {
    const params = httpParams(criteria);
    return httpHandlerPipeMapClothing(this.http.get(`${this.baseUrl}`, { params }));
  }

}
