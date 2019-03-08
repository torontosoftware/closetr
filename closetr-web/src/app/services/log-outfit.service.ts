import { Injectable } from '@angular/core';
import { ClosetService } from './closet.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LogOutfitService {
  constructor(private closetService: ClosetService,
              private http: HttpClient) { }

  /*
  Input: clothing object (generic for now)
  Adds clothing to outfit clothing list, and to the closet as well.
  Format {name, cost, category}
  */
  addOutfitClothing(params: any): void {
    console.log(params,"howdywww");
    this.http.post('http://localhost:8080/api/outfitEntries/entry', params).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllOutfitClothes(criteria: any): any {
    const params = new HttpParams({
      fromObject: criteria
    });
    console.log("tried my best");
    return this.http.get<any>('http://localhost:8080/api/outfitEntries/entry', {params});
  }

  setAllOutfitClothes(outfitClothingList: any): void {
    //
  }
}
