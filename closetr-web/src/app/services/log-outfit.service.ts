import { Injectable } from '@angular/core';
import { ClosetService } from './closet.service';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  addOutfitClothing(clothing: any, mode: String): void {
    console.log(clothing,"howdywww");
    this.http.post('http://localhost:8080/api/outfitEntries/entry', clothing).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );

    // further actions depending on mode
    switch (mode) {
      case 'search':
        break;
      case 'manual':
        this.closetService.addClothing(clothing);
        break;
    }
  }

  getAllOutfitClothes(criteria: any): any {
    const params = new HttpParams({
      fromObject: criteria
    });
    return this.http.get('http://localhost:8080/api/outfitEntries/entry', {params});
  }

  setAllOutfitClothes(outfitClothingList: any): void {
    //
  }
}
