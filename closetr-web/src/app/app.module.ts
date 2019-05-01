import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//components
import { TodayWidgetComponent } from './pages/page-partial/today-widget/today-widget.component';
import { BudgetWidgetComponent } from './pages/page-partial/budget-widget/budget-widget.component';
import { ClosetWidgetComponent } from './pages/page-partial/closet-widget/closet-widget.component';
import { ClosetCardComponent } from './pages/page-partial/closet-card/closet-card.component';
import { LogOutfitComponent } from './pages/page-full/log-outfit/log-outfit.component';
import { DashboardComponent } from './pages/page-full/dashboard/dashboard.component';
import { ClothingFormComponent } from './pages/page-full/clothing-form/clothing-form.component';
import { AddClothingComponent } from './pages/page-full/add-clothing/add-clothing.component';
import { ClosetManageComponent } from './pages/page-full/closet-manage/closet-manage.component';
import { EditClothingComponent } from './pages/page-full/edit-clothing/edit-clothing.component';
import { SpendingManageComponent } from './pages/page-full/spending-manage/spending-manage.component';
import { BudgetManageComponent } from './pages/page-full/budget-manage/budget-manage.component';
import { LoginComponent } from './pages/page-full/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { RegisterComponent } from './pages/page-full/register/register.component';
import { ProfileComponent } from './pages/page-full/profile/profile.component';
import { UserMenuComponent } from './pages/page-partial/user-menu/user-menu.component';

//pipes
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { DateRangeFilterPipe } from './pipes/date-range-filter.pipe';

//services
import { ClosetService } from './services/closet.service';
import { LogOutfitService } from './services/log-outfit.service';
import { RoutesService } from './services/routes.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { DateFormatService } from './services/utils/date-format.service';

//ui-library
import { SharedModule } from './shared/shared.module';

//test
import { TestModule } from '../test/test.module';

@NgModule({
  declarations: [
    AppComponent,
    TodayWidgetComponent,
    BudgetWidgetComponent,
    ClosetWidgetComponent,
    ClosetCardComponent,
    LogOutfitComponent,
    DashboardComponent,
    AddClothingComponent,
    ClosetManageComponent,
    EditClothingComponent,
    SpendingManageComponent,
    BudgetManageComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    UserMenuComponent,
    ProfileComponent,
    ClothingFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TestModule,
    SharedModule
  ],
  providers: [
    ClosetService,
    LogOutfitService,
    RoutesService,
    UserService,
    AuthenticationService,
    DateFormatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
