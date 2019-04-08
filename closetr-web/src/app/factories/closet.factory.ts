import { Observable } from 'rxjs';

export const ClosetFactory = {
  getAllClothes: (component: any): Observable<any> => {
    return component.closetService.getAllClothes(component.currentUser)
      .subscribe(data => component.closetList = data)
  },
  removeClothing: (component: any, clothingID: any): Observable<any> => {
    return component.closetService.removeClothing(clothingID)
      .subscribe(data => component.getAllClothes())
  }
}
