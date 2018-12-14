import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../services/closet.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-closet-manage',
  templateUrl: './closet-manage.component.html',
  styleUrls: ['./closet-manage.component.scss']
})

export class ClosetManageComponent implements OnInit {
  closetList: any;
  closetService: ClosetService;
  editMode : boolean;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.closetService.setAllClothes(this.closetList);
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }

  removeCard(clothingID: any): void {
    delete this.closetList[clothingID];
  }

  constructor(private closetservice: ClosetService, private router: Router) {
    this.editMode = false;
    this.closetService = closetservice;
    this.closetList = this.closetService.getAllClothes();
    console.log(this.closetList);
  }

  ngOnInit() {
  }

}
