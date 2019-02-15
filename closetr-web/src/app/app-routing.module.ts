import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClosetManageComponent } from './closet-manage/closet-manage.component';
import { AddClothingComponent } from './add-clothing/add-clothing.component';
import { EditClothingComponent } from './edit-clothing/edit-clothing.component';
import { LogOutfitComponent } from './today-widget/log-outfit/log-outfit.component';
import { SpendingManageComponent } from './spending-manage/spending-manage.component';
import { BudgetManageComponent } from './budget-manage/budget-manage.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', canActivate:[AuthGuard], children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'log-outfit', component: LogOutfitComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'add-clothing', component: AddClothingComponent},
    {path: 'closet-manage', component: ClosetManageComponent},
    {path: 'edit-clothing/:id', component: EditClothingComponent},
    {path: 'spending-manage', component: SpendingManageComponent},
    {path: 'budget-manage', component: BudgetManageComponent},
    {path: 'profile', component: ProfileComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
