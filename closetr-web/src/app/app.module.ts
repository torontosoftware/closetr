import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodayWidgetComponent } from './today-widget/today-widget.component';
import { BudgetWidgetComponent } from './budget-widget/budget-widget.component';
import { ClosetWidgetComponent } from './closet-widget/closet-widget.component';
import { ClosetCardComponent } from './closet-widget/closet-card/closet-card.component';
import { LogOutfitComponent } from './today-widget/log-outfit/log-outfit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddClothingComponent } from './add-clothing/add-clothing.component';
import { ClosetService } from './services/closet.service';
import { LogOutfitService } from './services/log-outfit.service';
import { RoutesService } from './services/routes.service';
import { ClosetManageComponent } from './closet-manage/closet-manage.component';
import { EditClothingComponent } from './edit-clothing/edit-clothing.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SpendingManageComponent } from './spending-manage/spending-manage.component';
import { BaseGeneralComponent } from './base-general/base-general.component';
import { BudgetManageComponent } from './budget-manage/budget-manage.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { RegisterComponent } from './register/register.component';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClosetService, LogOutfitService, RoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
