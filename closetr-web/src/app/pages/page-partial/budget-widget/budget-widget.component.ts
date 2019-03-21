import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-budget-widget',
  templateUrl: './budget-widget.component.html',
  styleUrls: ['./budget-widget.component.scss']
})
export class BudgetWidgetComponent implements OnInit {
  purchaseList: object;
  dateOptions: Array<string>;
  closetList: Array<Clothing>;
  filterCriteria: any;
  currentUser: User;

  constructor(
    private closetService: ClosetService,
    private authenticationService: AuthenticationService,
    private dateFormatService: DateFormatService
  ) {
    this.dateOptions = [
      "last week",
      "last month"
    ];
    this.filterCriteria = {
      dateRangeFor: "last week",
      dateFrom: this.dateFormatService.dateRangeForFrom("last week"),
      dateTo: this.dateFormatService.newDate()
    };

  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    );
  }

  updateFilterCriteria(): void {
    this.filterCriteria.dateFrom = this.dateFormatService.dateRangeForFrom(
      this.filterCriteria.dateRangeFor
    );
  }

  getAllClothes(): void {
    this.closetService.getAllClothes(this.currentUser).subscribe(
      (data: any) => {
        this.closetList = data.data.slice(0,3);
        for (let i in this.closetList) {
          this.closetList[i] = new Clothing(this.closetList[i]);
        }
      }, error => {}
    )
  }

}
