import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  sortOptions,
  filterOptions,
  mockClothingOne,
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
  baseUrl = `http://localhost:8080/`;
  currentUser = of(mockUserOne);
  currentUserValue = of(mockUserOne);
  login = () => of(true);
  logout = () => { return };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceNoUserMock {
  baseUrl = `http://localhost:8080/`;
  currentUser = null;
  currentUserValue = null;
  login = () => of(true);
  logout = () => { return };
}

@Injectable({
  providedIn: 'root'
})
export class ClosetServiceMock {
  addClothing = (clothing) => of({data: {_id: 'id'}});
  getAllClothes = (user) => of({data: mockClosetList});
  removeClothing = (id) => of({data: mockClosetList});
  getClothingForEdit = () => mockClothingOne;
  setClothingForEdit = () => { return };
  editClothing = () => of(true);
  getSortOptions = () => sortOptions;
  getFilterOptions = () => filterOptions;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  update = (user) => of({data: mockUserTwo});
  register = (params) => of({auth: true});
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
