import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/page-full/login/login.component';
import { RegisterComponent } from './pages/page-full/register/register.component';
import { DashboardComponent } from './pages/page-full/dashboard/dashboard.component';
import { ClosetManageComponent } from './pages/page-full/closet-manage/closet-manage.component';
import { AddClothingComponent } from './pages/page-full/add-clothing/add-clothing.component';
import { EditClothingComponent } from './pages/page-full/edit-clothing/edit-clothing.component';
import { LogOutfitComponent } from './pages/page-full/log-outfit/log-outfit.component';
import { SpendingManageComponent } from './pages/page-full/spending-manage/spending-manage.component';
import { BudgetManageComponent } from './pages/page-full/budget-manage/budget-manage.component';
import { ProfileComponent } from './pages/page-full/profile/profile.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

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
