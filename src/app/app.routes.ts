import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login';
import { authGuard } from './infrastructure/guards/auth.guard';
import { guestGuard } from './infrastructure/guards/guest.guard';
import { SearchComponent } from './presentation/search/search';
import { RegisterComponent } from './presentation/register/register';
import { ForgotPasswordComponent } from './presentation/forgot-password/forgot-password';
import { PlaylistsComponent } from './presentation/playlists/playlists';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [guestGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [authGuard] },
];
