import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  prevUrl: String;

  constructor() { }

  setPrevUrl(url: String): void {
    this.prevUrl = url;
  }

  getPrevUrl(): String {
    return this.prevUrl;
  }
}
