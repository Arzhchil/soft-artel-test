import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: { breadcrumb: 'Вход' },
  },
  {
    path: '',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Главная' },
    children: [
      {
        path: 'profile/:userID',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        data: { breadcrumb: 'Профиль' },
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
        data: { breadcrumb: 'Заявки' },
      },
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
