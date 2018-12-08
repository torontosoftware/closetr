import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodayWidgetComponent } from './today-widget/today-widget.component';
import { BudgetWidgetComponent } from './budget-widget/budget-widget.component';
import { ClosetWidgetComponent } from './closet-widget/closet-widget.component';
import { ClosetCardComponent } from './closet-widget/closet-card/closet-card.component';
import { LogOutfitComponent } from './today-widget/log-outfit/log-outfit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayWidgetComponent,
    BudgetWidgetComponent,
    ClosetWidgetComponent,
    ClosetCardComponent,
    LogOutfitComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
