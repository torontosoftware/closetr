import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClosetManageComponent } from './closet-manage/closet-manage.component';
import { AddClothingComponent } from './add-clothing/add-clothing.component';
import { EditClothingComponent } from './edit-clothing/edit-clothing.component';
import { LogOutfitComponent } from './today-widget/log-outfit/log-outfit.component';
import { SpendingManageComponent } from './spending-manage/spending-manage.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'log-outfit', component: LogOutfitComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-clothing', component: AddClothingComponent},
  {path: 'closet-manage', component: ClosetManageComponent},
  {path: 'edit-clothing/:id', component: EditClothingComponent},
  {path: 'spending-manage', component: SpendingManageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
