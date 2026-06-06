import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tour/:id', component: TourDetailsComponent, canActivate: [authGuard] },
  { path: 'map/:id', component: MapViewComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];