import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../../services/closet.service';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {
  closetList: Array<any>;
  closetService: ClosetService;
  editMode : boolean;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  back(): void {
    this._location.back();
  }

  removeCard(clothing: any): void {
    console.log("from the parent", clothing);
    var index = this.closetList.indexOf(clothing);
    this.closetList.splice(index, 1);
    console.log(index);
  }

  constructor(private _location: Location, private closetservice: ClosetService) {
    this.editMode = false;
    this.closetService = closetservice;
    this.closetList = this.closetService.getAllClothes();
    console.log(this.closetList);
  }

  ngOnInit() {
  }

}
