import { NgModule } from '@angular/core';

//components
import {
  MockAddClothingComponent,
  MockBudgetManageComponent,
  MockClosetManageComponent,
  MockDashboardComponent,
  MockClothingFormComponent,
  MockEditClothingComponent,
  MockLogOutfitComponent,
  MockLoginComponent,
  MockProfileComponent,
  MockRegisterComponent,
  MockSpendingManageComponent,
  MockBudgetWidgetComponent,
  MockClosetCardComponent,
  MockClosetStatsWidgetComponent,
  MockClosetWidgetComponent,
  MockTodayWidgetComponent,
  MockUserMenuComponent
} from './components';

//pipes
import {
  SearchFilterPipeMock,
  DateRangeFilterPipeMock
} from './pipes';

//services
import {
  AuthenticationServiceMock,
  AuthenticationServiceNoUserMock,
  ClosetServiceMock,
  UserServiceMock,
  LogOutfitServiceMock,
  RoutesServiceMock
} from './services';

@NgModule({
  declarations: [
    MockAddClothingComponent,
    MockBudgetManageComponent,
    MockClosetManageComponent,
    MockDashboardComponent,
    MockClothingFormComponent,
    MockEditClothingComponent,
    MockLogOutfitComponent,
    MockLoginComponent,
    MockProfileComponent,
    MockRegisterComponent,
    MockSpendingManageComponent,
    MockBudgetWidgetComponent,
    MockClosetCardComponent,
    MockClosetStatsWidgetComponent,
    MockClosetWidgetComponent,
    MockTodayWidgetComponent,
    MockUserMenuComponent,
    SearchFilterPipeMock,
    DateRangeFilterPipeMock
  ],
  providers: [
    AuthenticationServiceMock,
    AuthenticationServiceNoUserMock,
    ClosetServiceMock,
    UserServiceMock,
    LogOutfitServiceMock,
    RoutesServiceMock
  ]
})
export class TestModule { }
