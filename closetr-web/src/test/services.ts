import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  sortOptions,
  filterOptions,
  mockClothingOne,
  mockUserTwo,
  mockClosetList,
  mockUserOne,
  mockUserTwo,
  mockOutfitClothingList
} from './objects';

/*
Contains mock services used for
testing purposes.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceMock {
  currentUser = of(mockUserOne);
  logout = () => { return };
}

@Injectable({
  providedIn: 'root'
})
export class ClosetServiceMock {
  getAllClothes = (user) => of({data: mockClosetList});
  removeClothing = (id) => of({data: mockClosetList});
  getClothingForEdit = () => mockClothingOne;
  editClothing = () => of(true);
  getSortOptions = () => sortOptions;
  getFilterOptions = () => filterOptions;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  update = (user) => of({data: mockUserTwo});
}

@Injectable({
  providedIn: 'root'
})
export class LogOutfitServiceMock {
  getAllOutfitClothes = (params) => of({data: mockOutfitClothingList});
  addOutfitClothing = (params) => of({data: true});
  deleteOutfitClothing = (params) => of({data: true});
}

@Injectable({
  providedIn: 'root'
})
export class RoutesServiceMock {
  getPrevUrl = () => '/log-outfit';
  setPrevUrl = (params) => { return };
}
