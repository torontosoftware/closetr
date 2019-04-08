import { Observable } from 'rxjs';

export const ClosetFactory = {
  getAllClothes: (component: any): Observable<any> => {
    console.log(component)
    return component.closetService.getAllClothes(component.currentUser)
      .subscribe(data => component.closetList = data)
  }
}
