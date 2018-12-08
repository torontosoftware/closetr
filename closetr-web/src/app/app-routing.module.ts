import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogOutfitComponent } from './today-widget/log-outfit/log-outfit.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'log-outfit', component: LogOutfitComponent},
  {path: '', component: DashboardComponent},
  //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //{path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
