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
import { AddClothingComponent } from './pages/page-full/add-clothing/add-clothing.component';
import { ClosetManageComponent } from './pages/page-full/closet-manage/closet-manage.component';
import { EditClothingComponent } from './pages/page-full/edit-clothing/edit-clothing.component';
import { SpendingManageComponent } from './pages/page-full/spending-manage/spending-manage.component';
import { BaseGeneralComponent } from './pages/page-full/base-general/base-general.component';
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
import { UiInputComponent } from './shared/ui-input/ui-input.component';
import { UiTextButtonComponent } from './shared/ui-text-button/ui-text-button.component';
import { UiInputSelectComponent } from './shared/ui-input-select/ui-input-select.component';
import { UiInputAddButtonComponent } from './shared/ui-input-add-button/ui-input-add-button.component';
import { UiInputAddTextComponent } from './shared/ui-input-add-text/ui-input-add-text.component';
import { UiSelectAddButtonComponent } from './shared/ui-select-add-button/ui-select-add-button.component';
import { UiBackButtonComponent } from './shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from './shared/ui-edit-button/ui-edit-button.component';
import { UiCloseButtonComponent } from './shared/ui-close-button/ui-close-button.component';
import { UiFilterSelectComponent } from './shared/ui-filter-select/ui-filter-select.component';
import { UiTableComponent } from './shared/ui-table/ui-table.component';

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
    SearchFilterPipe,
    SpendingManageComponent,
    BaseGeneralComponent,
    BudgetManageComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    DateRangeFilterPipe,
    UserMenuComponent,
    ProfileComponent,
    UiInputComponent,
    UiTextButtonComponent,
    UiInputSelectComponent,
    UiInputAddButtonComponent,
    UiInputAddTextComponent,
    UiSelectAddButtonComponent,
    UiBackButtonComponent,
    UiEditButtonComponent,
    UiCloseButtonComponent,
    UiFilterSelectComponent,
    UiTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
