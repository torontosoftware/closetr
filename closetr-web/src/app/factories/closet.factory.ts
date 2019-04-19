import { Observable } from 'rxjs';
import { Clothing } from '../models/clothing.model';

export const ClosetFactory = {
  getAllClothes: (component: any): Observable<any> => {
    return component.closetService.getAllClothes(component.currentUser)
      .subscribe(closetList =>
        component.closetList = closetList.map(clothing =>
          new Clothing({ ...clothing, userID: component.currentUser.id })));
  },
  removeClothing: (component: any, clothingID: any): Observable<any> => {
    return component.closetService.removeClothing(clothingID)
      .subscribe(data => component.getAllClothes())
  }
}
