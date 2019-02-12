import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../services/closet.service';
import { Clothing } from '../models/clothing.model';

@Component({
  selector: 'app-closet-widget',
  templateUrl: './closet-widget.component.html',
  styleUrls: ['./closet-widget.component.scss']
})
export class ClosetWidgetComponent implements OnInit {
  closetList: Array<Clothing>;
  closetService: ClosetService;

  constructor(private closetservice: ClosetService) {
    this.closetService = closetservice;
    this.closetService.getAllClothes('newfides').subscribe(
      (data: any) => {
        this.closetList = data.data;
        for (let i in this.closetList) {
          this.closetList[i] = new Clothing(this.closetList[i]);
        }
      },
      error => { }
    );
  }

  ngOnInit() {
  }

}
